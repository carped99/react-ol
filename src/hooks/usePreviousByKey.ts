import { useLayoutEffect, useRef } from 'react';
import { compareOptIn, compareOptOut } from '../utils/common';

type Prev<T> = {
  prev: T | undefined;
  curr: T;
  isEqual: boolean;
};

/**
 * 이전 값과 현재 값을 비교하여 변경이 있는 경우에만 현재 값을 반환하고, 그렇지 않으면 이전 값을 반환한다.
 *
 * @param value - 설정값
 * @param keys - 비교할 키
 * @param optIn - optIn 방식
 * @example
 * ```tsx
 * const value = useOptions({ key: 'value' }, ['key']);
 * ```
 */
export const usePreviousByKey = <T extends object>(value: T, keys: readonly (keyof T)[], optIn = true) => {
  // 설정값을 저장할 ref
  const ref = useRef<Prev<T>>({
    prev: undefined,
    curr: value,
    isEqual: false,
  });

  useLayoutEffect(() => {
    const { curr } = ref.current;
    const isEqual = optIn ? compareOptIn(curr, value, keys) : compareOptOut(curr, value, keys);

    ref.current = {
      prev: curr,
      curr: value,
      isEqual,
    };
  });

  return ref.current;
};
