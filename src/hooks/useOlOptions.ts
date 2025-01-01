import { useRef } from 'react';
import { compareOptIn, compareOptOut } from '@src/utils/common';

/**
 * 설정값이 변경되었을 때만 저장하는 hook
 * @param options - 설정값
 * @param keys - 비교할 키
 * @param optIn - optIn 방식
 * @returns 설정값
 * @example
 * ```tsx
 * const options = useOlOptions({ key: 'value' }, ['key']);
 * ```
 */
export const useOlOptions = <T extends object>(options: T, keys: readonly (keyof T)[], optIn = true): T => {
  // 설정값을 저장할 ref
  const ref = useRef<T>(options);

  const isEqual = optIn ? compareOptIn(ref.current, options, keys) : compareOptOut(ref.current, options, keys);

  // 설정값이 변경되었을 때만 저장
  if (!isEqual) {
    ref.current = options;
  }

  return ref.current;
};
