import { InstanceCreator, InstanceProvider } from './InstanceProvider';
import { equalsByProps, equalsDeep } from '../utils/common';

export const createBaseObjectProvider = <
  T,
  P extends Record<string, unknown>,
  K extends keyof P & string = keyof P & string,
>(
  create: InstanceCreator<T, P>,
  createKeys: ReadonlyArray<K> = [],
  updateKeys: ReadonlyArray<K> = [],
  nullishKeys: ReadonlyArray<Exclude<keyof P, K>> = [],
): InstanceProvider<T, P> => {
  // 객체를 생성할 때 사용할 조건 함수
  const canCreate = (curr?: P, prev?: P) => {
    // `createKeys`에 해당하는 속성이 변경되었을 경우 객체를 재생성
    if (!equalsByProps(curr, prev, createKeys)) {
      return true;
    }

    // 이전 값은 존재하지만 현재 값이 `nullish`인 경우 객체를 재생성
    return nullishKeys.some((key) => {
      return prev?.[key] != null && curr?.[key] == null;
    });
  };

  // 객체를 수정할 때 사용할 조건 함수
  const canUpdate = (curr?: P, prev?: P) => {
    return !equalsByProps(curr, prev, updateKeys);
  };

  // 객체를 수정하는 함수
  const update = (instance: T, curr?: P, prev?: P) => {
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
    create,
    canCreate,
    canUpdate,
    update,
  };
};
