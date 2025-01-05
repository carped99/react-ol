import { useDebugValue, useEffect, useRef } from 'react';
import Disposable from 'ol/Disposable';
import { usePrevious } from './usePrevious';
import { equalsDeep } from '../utils/common';
import { debug } from '../utils/logger';

/**
 * 객체를 생성하는 함수
 *
 * @typeParam T - 생성할 객체의 타입
 * @typeParam P - 생성에 필요한 속성의 타입
 *
 * @param currProps - 현재 속성. 속성이 `undefined`일 수 있습니다.
 * @param prevProps - 이전 속성.
 *
 * @returns T - 생성된 객체
 */
export type InstanceCreator<T, P> = (currProps: P, prevProps?: P) => T;

/**
 * 객체의 상태를 수정하는 함수
 *
 * @typeParam T - 수정할 객체의 타입
 * @typeParam P - 수정에 필요한 속성의 타입
 *
 * @param state - 현재 상태
 * @param currProps - 갱신에 필요한 현재 속성들. 속성이 `undefined`일 수 있습니다.
 * @param prevProps - (선택적) 이전 속성들. 상태 갱신 시 비교하거나 이전 상태를 참고할 때 사용됩니다.
 *
 * @returns void - 이 함수는 상태를 직접 수정하며, 반환 값은 없습니다.
 */
export type InstanceUpdater<T, P> = (instance: T, currProps?: P, prevProps?: P) => void;

/**
 * 객체를 생성하거나 수정할지 결정하는 함수의 형태를 정의합니다.
 *
 * @typeParam P - 객체에 필요한 속성들의 타입
 *
 * @param currProps - 현재 속성들
 * @param prevProps - 이전 속성들
 */
export type InstancePredicate<P> = (currProps?: P, prevProps?: P) => boolean;

/**
 * 객체를 생성하거나 수정하는 로직을 제공합니다.
 *
 * @typeParam T - 관리하는 객체의 타입
 * @typeParam P - 객체에 필요한 속성들의 타입
 *
 * @param props - 객체를 생성하거나 갱신할 때 사용할 속성 값들
 * @param createFn - 객체를 생성하는 함수
 * @param updateFn - 객체를 수정하는 함수
 * @param createPredicate - 생성 여부
 * @param updatePredicate - 수정 여부
 */
export const useInstance = <T extends Disposable, P extends object>(
  props: P,
  createFn: InstanceCreator<T, P>,
  updateFn: InstanceUpdater<T, P>,
  createPredicate: InstancePredicate<P>,
  updatePredicate: InstancePredicate<P>,
): T => {
  useDebugValue(props);

  // 객체를 저장하기 위한 Ref 객체
  const instanceRef = useRef<T | undefined>(undefined);

  // 초기화 여부를 저장하기 위한 Ref 객체
  const initialized = useRef(false);

  // 이전 속성을 저장하기 위한 Ref 객체
  const prevProps = usePrevious(props);

  // 처음 실행 시 객체를 생성한다.
  if (instanceRef.current === undefined) {
    debug(() => `Create instance: ${props}`);
    instanceRef.current = createFn(props, prevProps);
  }

  useEffect(() => {
    return () => {
      instanceRef.current?.dispose();
      instanceRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    // 초기화가 완료된 이후에만 실행한다.
    if (initialized.current && !equalsDeep(props, prevProps)) {
      if (createPredicate(props, prevProps)) {
        debug(() => `Recreate instance: ${props}`);
        instanceRef.current!.dispose();
        instanceRef.current = createFn(props, prevProps);
      } else if (updatePredicate(props, prevProps)) {
        debug(() => `Update instance: ${props}`);
        updateFn(instanceRef.current!, props, prevProps);
      }
    } else {
      if (!instanceRef.current) throw new Error('This should not be reached');

      initialized.current = true;
    }
  }, [props, prevProps, createFn, updateFn, createPredicate, updatePredicate]);

  return instanceRef.current;
};
