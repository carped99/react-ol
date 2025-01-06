import { useEffect, useRef } from 'react';

/**
 * 주어진 값을 이전 값으로 저장하고, 이전 값을 반환.
 *
 * @typeParam T - 추적할 값의 타입.
 * @param value - 추적할 값. 이 값은 렌더링마다 업데이트됩니다.
 *
 * @returns 이전 렌더링에서의 값. 첫 번째 렌더링에서는 `undefined`를 반환합니다.
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
