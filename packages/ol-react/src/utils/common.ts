import { default as deepEqual } from 'fast-deep-equal/es6';
import Interaction from 'ol/interaction/Interaction.js';
import Map from 'ol/Map.js';
import { Class } from '../types';
import { equalsDeep } from './equals';

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
