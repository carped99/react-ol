import { useDebugValue, useEffect, useRef } from 'react';
import { usePrevious } from './usePrevious';
import { equalsDeep } from '../utils/common';
import { debug } from '../utils/logger';
import { InstanceProvider } from './InstanceProvider';

/**
 * 객체를 생성하거나 수정하는 로직을 제공합니다.
 *
 * @typeParam T - 관리하는 객체의 타입
 * @typeParam P - 객체에 필요한 속성들의 타입
 *
 * @param props - 객체를 생성하거나 갱신할 때 사용할 속성 값들
 * @param provider - 객체를 생성하거나 수정하는 로직을 제공하는 객체
 */
export const useInstance = <T, P>(provider: InstanceProvider<T, P>, props: P): T => {
  useDebugValue(props);

  // 객체를 저장하기 위한 Ref 객체
  const instanceRef = useRef<T | undefined>(undefined);

  // 초기화 여부를 저장하기 위한 Ref 객체
  const initialized = useRef(false);

  // 이전 속성을 저장하기 위한 Ref 객체
  const prevProps = usePrevious(props);

  // 처음 실행 시 객체를 생성한다.
  if (instanceRef.current === undefined) {
    console.log('======================= createInstance', props);
    debug(() => `Create instance: ${props}`);
    instanceRef.current = provider.createInstance(props, prevProps);
  }

  useEffect(() => {
    return () => {
      instanceRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      instanceRef.current = provider.createInstance(props, prevProps);
      initialized.current = true;
    } else {
      // 초기화가 완료된 이후에만 실행한다.
      if (initialized.current && !equalsDeep(props, prevProps)) {
        if (provider.shouldCreate(props, prevProps)) {
          debug(() => `Recreate instance: ${props}`);
          instanceRef.current = provider.createInstance(props, prevProps);
        } else if (provider.shouldUpdate(props, prevProps)) {
          debug(() => `Update instance: ${props}`);
          provider.updateInstance(instanceRef.current!, props, prevProps);
        }
      }
    }
  }, [props, prevProps, provider]);

  return instanceRef.current;
};
