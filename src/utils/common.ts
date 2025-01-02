import { Interaction } from 'ol/interaction';
import { Class } from '@src/types/common';
import { Map } from 'ol';
import { deepEqual } from 'fast-equals';

/**
 * 지도에서 특정 {@link Interaction}을 찾는다.
 * @param map - 지도
 * @param clazz - 찾을 {@link Interaction} 클래스
 */
export function findInteraction(map: Map, clazz: Class<Interaction>) {
  return map
    .getInteractions()
    .getArray()
    .find((it) => it instanceof clazz);
}

type Comparator<T> = (o1: T, o2: T) => boolean;

type NonNullish<T> = Exclude<T, null | undefined>;

/**
 * 인자 값의 동일 여부를 boolean 값으로 반환
 *
 * @param o1 - 비교할 첫 번째 인자
 * @param o2 - 비교할 두 번째 인자
 * @param comparator - 객체 비교에 사용할 함수 (옵션)
 *
 * @returns
 * - `null`, `undefined` 또는 객체가 아닌 값의 비교일 경우 `o1 === o2`를 반환.
 * - `NaN` 비교의 경우 둘 다 `NaN`일 때 `true`를 반환.
 * - 객체일 경우, `comparator` 함수 결과를 반환.
 *
 * @example
 * // 기본 비교
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
export function compare<T>(o1: T, o2: T, comparator: Comparator<NonNullish<T>> = defaultComparator): boolean {
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
 */
export const compareOptIn = <T extends object>(o1: T, o2: T, keys: readonly (keyof T)[]): boolean => {
  return compare(o1, o2, (p1, p2) => compareOptInImpl(p1, p2, keys));
};

/**
 * 객체의 모든 값들 중 `keys`에 해당하지 않는 값들을 비교하여 같은지 확인한다.
 * @param o1 - 비교할 첫 번째 객체
 * @param o2 - 비교할 두 번째 객체
 * @param keys - 비교에서 제외할 키 목록
 */
export const compareOptOut = <T extends object>(o1: T, o2: T, keys: readonly (keyof T)[]): boolean => {
  return compare(o1, o2, (p1, p2) => compareOptOutImpl(p1, p2, keys));
};

const defaultComparator = (o1: unknown, o2: unknown) => o1 === o2;

const compareOptInImpl = <T extends object>(o1: T, o2: T, keys: readonly (keyof T)[]): boolean => {
  for (const key of keys) {
    if (!deepEqual(o1[key], o2[key])) {
      return false;
    }
  }
  return true;
};

const compareOptOutImpl = <T extends object>(o1: T, o2: T, keys: readonly (keyof T)[]): boolean => {
  const allKeys = new Set<keyof T>([...(Object.keys(o1) as (keyof T)[]), ...(Object.keys(o2) as (keyof T)[])]);

  for (const key of allKeys) {
    // `keys`에 포함되어 있으면 비교하지 않는다.
    if (keys.includes(key)) {
      continue;
    }

    if (!deepEqual(o1[key], o2[key])) {
      return false;
    }
  }
  return true;
};

export function compareDeep<T>(o1: T, o2: T): boolean {
  return compare(o1, o2, deepEqual);
}
