/**
 * 다음 애니메이션 프레임에서 콜백을 실행하는 함수
 *
 * @typeParam T - 콜백 함수의 타입
 * @param callback - 실행할 콜백 함수
 * @returns  - 콜백 함수의 실행 결과를 포함한 Promise
 *
 * @example
 * ```ts
 * // 기본 사용
 * await yieldAnimationFrame(() => {
 *   // 실행할 로직
 * });
 *```
 * @example
 * ```
 * // 반환값이 있는 경우
 * const result = await yieldAnimationFrame(() => {
 *   return someCalculation();
 * });
 * ```
 */
export const yieldAnimationFrame = <T extends (...args: any[]) => any>(callback?: T): Promise<ReturnType<T>> => {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      try {
        const result = callback ? callback() : undefined;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};
