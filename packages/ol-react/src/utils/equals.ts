import { default as deepEqual } from 'fast-deep-equal/es6';

type Comparator<T> = (o1: T, o2: T) => boolean;

type NonNullish<T> = Exclude<T, null | undefined>;

/**
 * 인자 값의 동일 여부를 boolean 값으로 반환
 *
 * @param o1 - 비교할 첫 번째 인자
 * @param o2 - 비교할 두 번째 인자
 * @param comparator - 객체 비교에 사용할 함수 (옵션)
 *
 * @remarks
 * - `NaN`, `NaN`: true
 * - `null`, `null`: true
 * - `undefined`, `undefined`: true
 * - `null`, `undefined`: false
 *
 * @example
 * ```
 * compare(1, 1); // true
 * compare(null, undefined); // false
 * compare(NaN, NaN); // true
 * compare({ a: 1 }, { a: 1 }); // false
 *
 * // 커스텀 비교 함수 사용
 * const customComparator = (o1: unknown, o2: unknown) => o1.a === o2.a;
 * compare({ a: 1 }, { a: 1 }, customComparator); // true
 * ```
 */
export function equals<T>(
  o1: T | undefined,
  o2: T | undefined,
  comparator: Comparator<NonNullish<T>> = defaultComparator,
): boolean {
  // null, undefined, 또는 객체가 아닌 경우 비교
  if (o1 == null || o2 == null || typeof o1 !== 'object' || typeof o2 !== 'object') {
    // NaN 비교
    if (o1 !== o1 && o2 !== o2) return true; // 둘 다 NaN인 경우
    return o1 === o2; // 기본 비교 (null, undefined 또는 다른 값)
  }

  return comparator(o1 as NonNullish<T>, o2 as NonNullish<T>);
}

/**
 * `keys`에 해당하는 값들을 비교하여 같은지 확인한다.
 * @param o1 - 비교할 첫 번째 객체
 * @param o2 - 비교할 두 번째 객체
 * @param keys - 비교할 키 목록
 * @param optIn - `true`일 때 `properties`에 명시된 속성만을 비교하고, `false`일 때는 그 외의 속성을 비교한다.
 */
export const equalsByProps = <T extends object>(
  o1: Readonly<T> | undefined,
  o2: Readonly<T> | undefined,
  keys: ReadonlyArray<keyof T>,
  optIn = true,
): boolean => {
  return equals(o1, o2, (p1, p2) => (optIn ? equalsByPropsOptIn(p1, p2, keys) : equalsByPropsOptOut(p1, p2, keys)));
};

const defaultComparator = (o1: unknown, o2: unknown) => o1 === o2;

const equalsByPropsOptIn = <T extends object>(
  o1: Readonly<T>,
  o2: Readonly<T>,
  properties: ReadonlyArray<keyof T>,
): boolean => {
  for (const property of properties) {
    if (!deepEqual(o1[property], o2[property])) {
      return false;
    }
  }
  return true;
};

const equalsByPropsOptOut = <T extends object>(o1: T, o2: T, properties: ReadonlyArray<keyof T>): boolean => {
  const allKeys = new Set<keyof T>([...(Object.keys(o1) as (keyof T)[]), ...(Object.keys(o2) as (keyof T)[])]);

  for (const key of allKeys) {
    // `properties`에 포함되어 있으면 비교하지 않는다.
    if (properties.includes(key)) {
      continue;
    }

    if (!deepEqual(o1[key], o2[key])) {
      return false;
    }
  }
  return true;
};

export function equalsDeep<T>(o1: T | undefined, o2: T | undefined): boolean {
  return equals(o1, o2, deepEqual);
}
