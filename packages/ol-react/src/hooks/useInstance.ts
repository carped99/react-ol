import { useDebugValue, useEffect, useMemo, useRef } from 'react';
import { debug } from '../utils/logger';
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
  useDebugValue(props);

  const provider = useMemo(() => instanceProvider, [instanceProvider]);

  // 객체를 저장하기 위한 Ref 객체
  const instanceRef = useRef<T | undefined>(undefined);

  // 초기화 여부를 저장하기 위한 Ref 객체
  // const initialized = useRef(false);

  // 이전 속성을 저장하기 위한 Ref 객체
  const prevProps = usePrevious(props, props);

  // 처음 실행할 때 객체를 바로 할당하기 위해 훅을 사용하지 않음.
  if (instanceRef.current === undefined) {
    debug(() => `Create instance`, props);
    instanceRef.current = provider.createInstance(props, prevProps);
    // initialized.current = false;
  }

  useEffect(() => {
    return () => {
      // initialized.current = false;
      instanceRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      if (props === prevProps) {
        return;
      }

      if (provider.shouldCreateInstance(props, prevProps)) {
        instanceRef.current = provider.createInstance(props, prevProps);
      } else if (provider.shouldUpdateInstance(props, prevProps)) {
        provider.updateInstance(instanceRef.current, props, prevProps);
      }
    } else {
      debug(() => `Create instance`, props);
      instanceRef.current = provider.createInstance(props, prevProps);
      // initialized.current = true;
    }
    // if (!instanceRef.current) throw new Error(`This should not be reached`);
  }, [props, prevProps, provider]);

  return instanceRef.current;
};
