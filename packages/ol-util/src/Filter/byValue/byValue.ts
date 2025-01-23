import { FALSE } from 'ol/functions';

/**
 * 객체의 특정 속성값으로 필터링하는 함수를 생성합니다.
 * @typeParam T - 대상 객체 타입
 * @typeParam K - 속성 경로 타입
 * @typeParam V - 속성값 타입
 */
export const byValue = <T extends object, K extends keyof T | string, V = K extends keyof T ? T[K] : unknown>(
  path: K,
  value: V | readonly V[] | undefined | null,
): ((data: T) => boolean) => {
  // null, undefined 처리
  if (value == null) return FALSE;

  const getValue = createGetter<T, V>(path);

  // 배열 처리
  if (Array.isArray(value)) {
    if (value.length === 0) return FALSE;
    if (value.length === 1) return (data: T) => getValue(data) === value[0];
    // 브라우저마다 살짝 다르네
    if (value.length < 5) return (data: T) => value.includes(getValue(data));

    // 큰 배열은 Set 사용
    const valueSet = new Set(value);
    return (data: T) => valueSet.has(getValue(data));
  }

  // 단일 값 처리
  return (data: T) => getValue(data) === value;
};

/**
 * 객체의 속성값을 안전하게 가져오는 유틸리티 함수
 */
const createGetter = <T extends object, V>(path: string | keyof T) => {
  if (typeof path !== 'string') {
    return (obj: T) => obj[path] as V;
  }

  const parts = path.split('.');
  if (parts.length === 1) {
    return (obj: T) => (obj as any)[parts[0]];
  }

  return (obj: T) => parts.reduce((acc: any, part) => acc && acc[part], obj) as V;
};
