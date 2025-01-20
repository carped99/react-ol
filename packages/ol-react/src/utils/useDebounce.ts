import { useCallback, useEffect, useRef } from 'react';

export interface DebounceOptions {
  delay?: number;
  leading?: boolean; // 첫 번째 호출 즉시 실행 여부
  maxWait?: number;
}

export function useDebounce<T extends (...args: any[]) => void>(callback: T, options: DebounceOptions = {}) {
  const { delay = 0, leading = false, maxWait = delay * 2 } = options;

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

  return useCallback(
    (...args: Parameters<T>) => {
      argsRef.current = args;
      const now = Date.now();

      // leading edge 실행
      if (leading && now - lastCallRef.current > delay) {
        callbackRef.current(...args);
        lastCallRef.current = now;
        return;
      }

      // 이전 예약된 실행 취소
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // maxWait 타이머 설정
      if (maxWait && !maxWaitRef.current) {
        maxWaitRef.current = setTimeout(() => {
          if (argsRef.current) {
            callbackRef.current(...argsRef.current);
            lastCallRef.current = Date.now();
            maxWaitRef.current = undefined;
          }
        }, maxWait);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (delay > 0) {
          timeoutRef.current = setTimeout(() => {
            callbackRef.current(...(argsRef.current as Parameters<T>));
            lastCallRef.current = Date.now();
            maxWaitRef.current = undefined;
          }, delay);
        } else {
          callbackRef.current(...(argsRef.current as Parameters<T>));
          lastCallRef.current = Date.now();
          maxWaitRef.current = undefined;
        }
      });
    },
    [delay, leading, maxWait],
  );
}
