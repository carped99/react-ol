import { equalsByProps, equalsDeep } from '../utils/common';
import { InstanceCreator, InstancePredicate, InstanceUpdater, useInstance } from './useInstance';
import { useCallback } from 'react';
import BaseObject from 'ol/Object';

/**
 * `props`과 `keys`를 사용하여 객체를 생성하거나 수정하는 로직을 제공합니다.
 *
 * @typeParam T - 관리하는 객체의 타입
 * @typeParam P - 객체에 필요한 속성들의 타입
 *
 * @param props - 객체를 생성하거나 갱신할 때 사용할 속성 값들.
 * @param createFn - 객체를 생성하는 함수.
 * @param createKeys - 해당 속성이 변경되었을 때 객체를 재생성해야 하는 속성 키들.
 * @param updateKeys - 해당 속성이 변경되었을 때 객체를 수정해야 하는 속성 키들.
 * @param nullishKeys - `nullish` 값을 허용하는 속성 키들.
 *
 * @see useInstance
 *
 * @remarks
 * 1. `props`와 `keys`가 변경되면, `createFn`이 호출되어 상태 객체가 새로 생성됩니다.
 * 2. `props`의 일부 속성이 변경되었을 경우, `updateFn`이 호출되어 상태 객체가 갱신됩니다.
 * 3. `useRef`를 사용하여 상태 객체를 참조하고, `useEffect` 내에서 상태 객체를 생성/갱신합니다.
 * 4. `equalsByProps` 함수를 사용하여 특정 속성만 비교하고, 변경된 속성에 대해 객체를 갱신합니다.
 */
export const useBaseObject = <
  T extends BaseObject,
  P extends Record<string, unknown>,
  K extends keyof P & string = keyof P & string,
>(
  props: P,
  createFn: InstanceCreator<T, P>,
  createKeys: ReadonlyArray<K> = [],
  updateKeys: ReadonlyArray<K> = [], // `createKeys`를 제외한 나머지 속성
  nullishKeys: ReadonlyArray<Exclude<keyof P, K>> = [],
) => {
  // 객체를 생성할 때 사용할 조건 함수
  const createPredicate = useCallback<InstancePredicate<P>>(
    (curr, prev) => {
      // `createKeys`에 해당하는 속성이 변경되었을 경우 객체를 재생성
      if (!equalsByProps(curr, prev, createKeys)) {
        return true;
      }

      // 이전 값은 존재하지만 현재 값이 `nullish`인 경우 객체를 재생성
      return nullishKeys.some((key) => {
        return prev?.[key] != null && curr?.[key] == null;
      });
    },
    [createKeys, nullishKeys],
  );

  // 객체를 수정할 때 사용할 조건 함수
  const updatePredicate = useCallback<InstancePredicate<P>>(
    (curr, prev) => {
      // `updateKeys`에 해당하는 속성이 변경되었을 경우 객체를 수정
      return !equalsByProps(curr, prev, updateKeys);
    },
    [updateKeys],
  );

  // 객체를 수정하는 함수
  const updateFn = useCallback<InstanceUpdater<T, P>>(
    (instance, curr, prev) => {
      for (const key of updateKeys) {
        const currValue = curr?.[key]; // 현재 값
        const prevValue = prev?.[key]; // 이전 값

        // 현재 값과 이전 값이 같으면 무시
        if (equalsDeep(currValue, prevValue)) {
          continue;
        }

        // setter 함수의 이름을 동적으로 생성 (예: setName, setAge 등)
        const setterName = `set${key[0].toUpperCase() + key.slice(1)}`;
        (instance as any)[setterName](currValue);
        // if (setterName in instance) {
        // }
      }
    },
    [updateKeys],
  );
  return useInstance(props, createFn, updateFn, createPredicate, updatePredicate);
};
