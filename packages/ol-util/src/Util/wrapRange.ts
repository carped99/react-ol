/**
 * 숫자를 지정된 범위 내로 래핑합니다.
 * @param value - 래핑할 숫자
 * @param min - 최소값 (포함)
 * @param max - 최대값 (제외)
 * @returns 래핑된 숫자
 */
export const wrapRange = (value: number, min: number, max: number): number => {
  const diff = max - min;
  return ((((value - min) % diff) + diff) % diff) + min;
};

/**
 * 각도를 0-360도 범위로 정규화합니다.
 * 주어진 각도를 360도 기준으로 순환하여 0 이상 360 미만의 값으로 변환합니다.
 *
 * @example
 * ```ts
 * // 기본 사용
 * wrapAngle(360)  // returns 0
 * wrapAngle(361)  // returns 1
 *
 * // 음수 각도 처리
 * wrapAngle(-1)   // returns 359
 * wrapAngle(-360) // returns 0
 *
 * // 큰 각도 처리
 * wrapAngle(720)  // returns 0
 * wrapAngle(725)  // returns 5
 * ```
 *
 * @param angle - 정규화할 각도 값
 * @returns 0 이상 360 미만의 정규화된 각도 값
 */
export const wrapAngle = (angle: number): number => wrapRange(angle, 0, 360);
