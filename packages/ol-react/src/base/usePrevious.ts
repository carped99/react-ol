import { useEffect, useRef } from 'react';

/**
 * 값의 이전 상태를 추적하는 커스텀 훅
 *
 * @typeParam T - 추적할 값의 타입
 * @param value - 현재 추적할 값
 * @param initial - 초기값 (선택적). 설정하지 않으면 undefined
 * @returns 이전 값 또는 초기값 (첫 렌더링 시)
 *
 * @example
 * ```ts
 * // 기본 사용 (초기값 없음)
 * const prevCount = usePrevious(count);
 *
 * // 초기값 설정
 * const prevCount = usePrevious(count, 0);
 * ```
 */
export const usePrevious = <T>(value: T, initial?: T): T | undefined => {
  const ref = useRef<T | undefined>(initial);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
