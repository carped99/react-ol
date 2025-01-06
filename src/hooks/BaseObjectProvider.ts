import { InstanceCreator, InstancePredicate, InstanceProvider, InstanceUpdater } from './InstanceProvider';
import { equalsByProps, equalsDeep } from '../utils/common';
import { useMemo } from 'react';

export const createBaseObjectProvider = <T, P extends object>(
  create: InstanceCreator<T, P>,
  createKeys: ReadonlyArray<keyof P & string> = [],
  updateKeys: ReadonlyArray<keyof P & string> = [],
  nullishKeys: ReadonlyArray<keyof P & string> = [],
): InstanceProvider<T, P> => {
  // 객체를 생성할 때 사용할 조건 함수
  const canCreate: InstancePredicate<P> = (curr?: P, prev?: P) => {
    // `createKeys`에 해당하는 속성이 변경되었을 경우 객체를 재생성
    if (!equalsByProps<P>(curr, prev, createKeys)) {
      return true;
    }

    // 이전 값은 존재하지만 현재 값이 `nullish`인 경우 객체를 재생성
    return nullishKeys.some((key) => {
      return prev?.[key] != null && curr?.[key] == null;
    });
  };

  // 객체를 수정할 때 사용할 조건 함수
  const canUpdate: InstancePredicate<P> = (curr?: P, prev?: P) => {
    return !equalsByProps<P>(curr, prev, updateKeys);
  };

  // 객체를 수정하는 함수
  const update: InstanceUpdater<T, P> = (instance: T, curr?: P, prev?: P) => {
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
  };

  return {
    create: (options: P) => create(options),
    canCreate,
    update,
    canUpdate,
  };
};

export const useBaseObjectProvider = <T, P extends object>(
  create: InstanceCreator<T, P>,
  createKeys: ReadonlyArray<keyof P & string> = [],
  updateKeys: ReadonlyArray<keyof P & string> = [],
  nullishKeys: ReadonlyArray<keyof P & string> = [],
) => {
  return useMemo(() => {
    return createBaseObjectProvider(create, createKeys, updateKeys, nullishKeys);
  }, [create, createKeys, nullishKeys, updateKeys]);
};
