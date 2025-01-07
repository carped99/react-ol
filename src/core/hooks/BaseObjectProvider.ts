import { InstanceCreator, InstancePredicate, InstanceProvider, InstanceUpdater } from './InstanceProvider';
import { equalsByProps, equalsDeep, updateProperties } from '../utils/common';
import { useMemo } from 'react';
import BaseObject from 'ol/Object';

export const useInstanceProviderByKeys = <T extends BaseObject, P extends object>(
  createInstance: InstanceCreator<T, P>,
  createKeys: ReadonlyArray<keyof P & string> = [],
  updateKeys: ReadonlyArray<keyof P & string> = [],
  nullishKeys: ReadonlyArray<keyof P & string> = [],
): InstanceProvider<T, P> => {
  return useMemo(() => {
    return createInstanceProviderByKey(createInstance, createKeys, updateKeys, nullishKeys);
  }, [createInstance, createKeys, nullishKeys, updateKeys]);
};

/**
 * 속성에 따라 객체를 생성하고, 수정하는 함수를 제공하는 훅
 * @param createInstance - 객체를 생성하는 함수
 * @param createKeys - 변경이 되면 객체를 생성한다.
 * @param updateKeys - 변경이 되면 객체를 수정한다.(새로운 값이 nullish인 경우에는 재생성)
 * @param nullishKeys - 변경이 되면 객체를 수정한다.(새로운 값이 nullish인 경우에도 수정)
 *
 * @see InstanceProvider
 */
export const createInstanceProviderByKey = <T extends BaseObject, P extends object>(
  createInstance: InstanceCreator<T, P>,
  createKeys: ReadonlyArray<keyof P & string> = [],
  updateKeys: ReadonlyArray<keyof P & string> = [],
  nullishKeys: ReadonlyArray<keyof P & string> = [],
): InstanceProvider<T, P> => {
  // 객체 생성 여부
  const shouldCreateInstance: InstancePredicate<P> = (curr, prev) => {
    // `createKeys`에 해당하는 속성이 변경되었을 경우 객체를 재생성
    if (!equalsByProps<P>(curr, prev, createKeys)) {
      return true;
    }

    // `updateKeys`에서 이전 값은 존재하지만 현재 값이 `nullish`인 경우 객체를 재생성
    return updateKeys.some((key) => {
      return prev?.[key] != null && curr?.[key] == null;
    });
  };

  // 객체 수정 여부
  const shouldUpdateInstance: InstancePredicate<P> = (curr, prev) => {
    return !equalsByProps<P>(curr, prev, updateKeys) || !equalsByProps<P>(curr, prev, nullishKeys);
  };

  // 객체를 수정하는 함수
  const updateInstance: InstanceUpdater<T, P> = (instance, curr, prev) => {
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

    updateProperties(instance.setProperties, curr, prev);
  };

  return {
    createInstance,
    shouldCreateInstance,
    updateInstance,
    shouldUpdateInstance,
  };
};
