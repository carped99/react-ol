import { Interaction } from 'ol/interaction';
import { Class } from '../types/common';
import { Map } from 'ol';
import { default as deepEqual } from 'fast-deep-equal/es6';

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

type SetterName<K extends string> = `set${Capitalize<K>}`;

type Setters<T> = {
  [K in keyof T as K extends `set${infer P}` ? Uncapitalize<P & string> : never]: (value: T[K]) => void;
};

/**
 * `prev`와 `curr` 객체에서 지정된 속성의 값을 비교하여 값이 변경된 경우, `obj` 객체의 해당 setter 메서드를 호출한다.
 *
 * @typeParam T - setter 메서드를 포함하는 객체의 타입.
 * @typeParam P - 비교할 속성들이 포함된 객체의 타입.
 * @typeParam K - 처리할 속성의 키 타입으로, 해당 키는 `P`에 존재하며, `T`에 대응하는 setter 메서드가 있어야한다.
 *
 * @param obj - setter 메서드를 포함하는 객체. 각 setter 메서드는 `set<PropertyName>` 형식.
 * @param curr - 현재 상태를 나타내는 객체.
 * @param prev - 이전 상태를 나타내는 객체.
 * @param names - 변경 여부를 확인할 속성 이름의 배열.
 *                배열의 각 이름은 `P`에 존재하고, `T`에 대응하는 setter 메서드가 있어야 합니다.
 *
 * @returns 속성 값이 변경되어 setter 메서드가 호출된 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * ```ts
 * interface MyObject {
 *   setName: (value: string) => void;
 *   setAge: (value: number) => void;
 * }
 *
 * interface MyOptions {
 *   name: string;
 *   age: number;
 * }
 *
 * const obj: MyObject = { setName: console.log, setAge: console.log };
 * const curr = { name: 'Bob', age: 25 };
 * const prev = { name: 'Alice', age: 25 };
 *
 * const updated = updateBySetter(obj, prev, curr, ['name', 'age']);
 * // `setName`이 호출되고 `updated`는 `true`를 반환.
 * ```
 */
export function updateBySetter<T, P extends object, K extends keyof P & string>(
  obj: T,
  curr: P = {} as P,
  prev: P = {} as P,
  names: readonly (K extends keyof P ? (SetterName<K> extends keyof T ? K : never) : never)[],
): boolean {
  let updated = false;

  // prev와 curr의 기본값 처리
  for (const name of names) {
    if (!deepEqual(prev[name], curr[name])) {
      const setterName = `set${name[0].toUpperCase() + name.slice(1)}` as SetterName<K>;
      // setterName이 Setters<T>에 있는지 확인
      const setter = obj[setterName as keyof Setters<T>];
      if (typeof setter === 'function') {
        setter(curr[name]);
        updated = true;
      }
    }
  }
  return updated;
}

export function updateProperties(
  setProperties: (
    properties: {
      [x: string]: any;
    },
    silent?: boolean,
  ) => void,
  curr?: object,
  prev?: object,
): void {
  if (!equalsDeep(curr, prev)) {
    setProperties(curr ?? {}, true);
  }
}
