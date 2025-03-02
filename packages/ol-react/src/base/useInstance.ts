import { useEffect, useMemo, useRef } from 'react';
import { InstanceProvider } from './InstanceProvider';
import { usePrevious } from './usePrevious';

/**
 * 객체를 생성하거나 수정하는 로직을 제공합니다.
 *
 * @typeParam T - 관리하는 객체의 타입
 * @typeParam P - 객체에 필요한 속성들의 타입
 *
 * @param props - 객체를 생성하거나 갱신할 때 사용할 속성 값들
 * @param instanceProvider - 객체를 생성하거나 수정하는 로직을 제공하는 객체
 */
export const useInstance = <T, P>(instanceProvider: InstanceProvider<T, P>, props: P): T => {
  // const provider = useMemo(() => instanceProvider, [instanceProvider]);

  // 객체를 저장하기 위한 Ref 객체
  const instanceRef = useRef<T | undefined>(undefined);

  // 이전 속성을 저장하기 위한 Ref 객체
  const prevProps = usePrevious(props, props);

  const instance = useMemo(() => {
    if (instanceRef.current == null || instanceProvider.shouldCreateInstance(props, prevProps)) {
      instanceRef.current = instanceProvider.createInstance(props, prevProps);
    } else if (instanceProvider.shouldUpdateInstance(props, prevProps)) {
      instanceProvider.updateInstance(instanceRef.current, props, prevProps);
    }
    return instanceRef.current;
  }, [props, prevProps, instanceProvider]);

  // 처음 실행할 때 객체를 바로 할당하기 위해 훅을 사용하지 않음.
  // if (instanceRef.current === undefined) {
  //   debug(() => `Create instance`, props);
  //   instanceRef.current = provider.createInstance(props, prevProps);
  //   // initialized.current = false;
  // }

  useEffect(() => {
    return () => {
      instanceRef.current = undefined;
    };
  }, []);

  return instance;
};
