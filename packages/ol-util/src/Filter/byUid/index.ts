import { getUid } from 'ol/util.js';

/**
 * OpenLayers의 UID를 기준으로 아이템을 필터링하는 함수
 * @param obj - 필터링할 대상 UID
 * @returns 필터 함수
 */
export const byUid = (obj: unknown) => {
  return (item: unknown) => {
    if (!item) return false;

    if (typeof obj === 'string') {
      return getUid(item) === obj;
    }
    return getUid(item) === getUid(obj);
  };
};
