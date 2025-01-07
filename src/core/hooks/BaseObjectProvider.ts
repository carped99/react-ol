import { InstanceCreator, InstancePredicate, InstanceProvider, InstanceUpdater } from './InstanceProvider';
import { equalsDeep } from '../utils/common';
import { useMemo } from 'react';
import { InstanceProperty } from '../layer/base/ObservableProperties';

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
    return properties.some((property) => {
      const currValue = curr?.[property.name as keyof P];
      const prevValue = prev?.[property.name as keyof P];

      if (property.settable && !property.nullable) {
        // `nullable` 속성이고 이전 값은 존재하며 현재 값이 `nullish`이면 객체를 재생성
        return prevValue != null && currValue == null;
      }

      if (!property.settable) {
        // `settable`이 아닌 속성에서 값이 변경되었으면 객체를 재생성
        return !equalsDeep(currValue, prevValue);
      }

      // 재생성하지 않음
      return false;
    });
  };

  // 객체 수정 여부
  const shouldUpdateInstance: InstancePredicate<P> = (curr, prev) => {
    return properties
      .filter((property) => property.settable)
      .some((property) => {
        const currValue = curr?.[property.name as keyof P];
        const prevValue = prev?.[property.name as keyof P];

        // 현재 값과 이전 값이 같으면 무시
        return !equalsDeep(currValue, prevValue);
      });
  };

  // 객체를 수정하는 함수
  const updateInstance: InstanceUpdater<T, P> = (instance, curr, prev) => {
    return properties
      .filter((property) => property.settable)
      .forEach((property) => {
        const currValue = curr?.[property.name as keyof P];
        const prevValue = prev?.[property.name as keyof P];

        // 현재 값과 이전 값이 같으면 무시
        if (equalsDeep(currValue, prevValue)) {
          return;
        }

        // setter 함수의 이름을 동적으로 생성 (예: setName, setAge 등)
        const setterName = `set${property.name[0].toUpperCase() + property.name.slice(1)}`;
        (instance as any)[setterName](currValue);
        // if (setterName in instance) {
        // }
      });
    // updateProperties(instance.setProperties, curr, prev);
  };

  return {
    createInstance,
    shouldCreateInstance,
    updateInstance,
    shouldUpdateInstance,
  };
};
