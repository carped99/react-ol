import { useCallback, useEffect, useRef } from 'react';

export interface DebounceOptions {
  delay?: number; // 디바운스 시간, 0이면 requestAnimationFrame 사용
  leading?: boolean; // 첫 번째 호출 즉시 실행 여부
  maxWait?: number; // 최대 대기 시간, 0이면 디바운스 시간을 사용
}

export function useDebounce<T extends (...args: any[]) => void>(callback: T, options: DebounceOptions = {}) {
  const { delay = 200, leading = false, maxWait = delay * 2 } = options;

  const rafRef = useRef<number>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const maxWaitRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef(callback);
  const argsRef = useRef<Parameters<T>>();
  const lastCallRef = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (maxWaitRef.current) clearTimeout(maxWaitRef.current);
    };
  }, []);

  const executeCallback = useCallback(() => {
    if (argsRef.current) {
      callbackRef.current(...argsRef.current);
      lastCallRef.current = Date.now();

      // maxWait 타이머 정리
      if (maxWaitRef.current) {
        clearTimeout(maxWaitRef.current);
        maxWaitRef.current = undefined;
      }
    }
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      argsRef.current = args;
      const now = Date.now();

      // leading edge 실행
      if (leading && now - lastCallRef.current > delay) {
        executeCallback();
        return;
      }

      // 이전 예약된 실행 취소
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // maxWait 타이머 설정
      if (maxWait && !maxWaitRef.current) {
        maxWaitRef.current = setTimeout(executeCallback, maxWait);
      }

      // 메인 디바운스 로직
      if (delay > 0) {
        timeoutRef.current = setTimeout(executeCallback, delay);
      } else {
        rafRef.current = requestAnimationFrame(executeCallback);
      }
    },
    [delay, executeCallback, leading, maxWait],
  );
}
