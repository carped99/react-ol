import BaseObject from 'ol/Object';

/**
 * 특정 속성의 값을 기준으로 필터링하는 함수를 생성합니다.
 *
 * @param key - 검사할 속성의 키
 * @param value - 비교할 값
 * @returns 객체의 특정 속성 값이 주어진 값과 일치하는지 확인하는 필터 함수
 *
 * @example
 * ```typescript
 * // ID가 'layer1'인 레이어 찾기
 * const hasLayerId = byProperty('id', 'layer1');
 * const layer = layers.find(hasLayerId);
 *
 * // 타입이 `background`인 레이어들 필터링
 * const isBackgroundLayer = byProperty('type', 'background');
 * const backgroundLayers = layers.filter(isBackgroundLayer);
 * ```
 */
export const byProperty = (key: string, value: unknown) => {
  return (item: BaseObject) => item.get(key) === value;
};
