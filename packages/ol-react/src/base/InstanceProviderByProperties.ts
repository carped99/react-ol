import { useMemo } from 'react';
import { InstanceProperty } from '../layer/base/ObservableProperties';
import { equalsDeep } from '../utils/common';
import { debug } from '../utils/logger';
import { InstanceCreator, InstancePredicate, InstanceProvider, InstanceUpdater } from './InstanceProvider';

export const useInstanceProviderByKeys = <T, P extends object>(
  createInstance: InstanceCreator<T, P>,
  properties: ReadonlyArray<InstanceProperty>,
): InstanceProvider<T, P> => {
  return useMemo(() => {
    return createInstanceProviderByKey(createInstance, properties);
  }, [createInstance, properties]);
};

/**
 * 속성에 따라 객체를 생성하고, 수정하는 함수를 제공하는 훅
 * @param createInstance - 객체를 생성하는 함수
 * @param properties - 객체를 생성하거나 수정하는데 사용할 속성 목록
 *
 * @see InstanceProvider
 */
export const createInstanceProviderByKey = <T, P extends object>(
  createInstance: InstanceCreator<T, P>,
  properties: ReadonlyArray<InstanceProperty>,
): InstanceProvider<T, P> => {
  // 객체 생성 여부
  const shouldCreateInstance: InstancePredicate<P> = (curr, prev) => {
    if (curr === prev) return false;

    for (const property of properties) {
      const currValue = curr?.[property.name as keyof P];
      const prevValue = prev?.[property.name as keyof P];

      // 수정이 불가능한 속성의 값이 변경되면 객체를 재생성
      if (!property.settable && !equalsDeep(currValue, prevValue)) {
        debug(() => `Recreate instance trigger by ${property.name}`);
        return true;
      }

      // setter 함수를 사용할 수 있지만, nullish 값이 불가능한 경우는 재생성 필요
      if (property.settable && !property.nullable && property.nullValue != null) {
        // `nullable` 속성이고 이전 값은 존재하며 현재 값이 `nullish`이면 객체를 재생성
        const result = prevValue != null && currValue == null;
        if (result) {
          debug(() => `Recreate instance trigger by ${property.name}`);
          return true;
        }
      }
    }
    // 재생성하지 않음
    return false;
  };

  // 객체 수정 여부
  const shouldUpdateInstance: InstancePredicate<P> = (curr, prev) => {
    if (curr === prev) return false;

    for (const property of properties) {
      if (!property.settable) {
        continue;
      }

      const currValue = curr?.[property.name as keyof P];
      const prevValue = prev?.[property.name as keyof P];

      // 현재 값과 이전 값이 같으면 무시
      const result = !equalsDeep(currValue, prevValue);

      if (result) {
        debug(() => `Update instance trigger by ${property.name}`);
      }

      if (result) {
        return result;
      }
    }

    return false;
  };

  // 객체를 수정하는 함수
  const updateInstance: InstanceUpdater<T, P> = (instance, curr, prev) => {
    for (const property of properties) {
      if (!property.settable) {
        continue;
      }

      const currValue = curr?.[property.name as keyof P];
      const prevValue = prev?.[property.name as keyof P];

      // 현재 값과 이전 값이 같으면 다음 속성으로
      if (equalsDeep(currValue, prevValue)) continue;

      // setter 이름 생성
      const setterName = `set${property.name[0].toUpperCase()}${property.name.slice(1)}`;
      const setter = (instance as any)[setterName];

      // setter가 존재하지 않으면 스킵
      if (typeof setter !== 'function') continue;

      // 값 설정
      if (currValue == null && property.nullValue != null) {
        setter.call(instance, typeof property.nullValue === 'function' ? property.nullValue() : property.nullValue);
      } else {
        setter.call(instance, currValue);
      }
    }
    // updateProperties(instance.setProperties, curr, prev);
  };

  return {
    createInstance,
    shouldCreateInstance,
    updateInstance,
    shouldUpdateInstance,
  };
};
