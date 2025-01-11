import { getUid } from 'ol';
/**
 * OpenLayers의 UID를 기준으로 아이템을 필터링하는 함수
 * @param uid - 필터링할 대상 UID
 * @returns 필터 함수
 */
export const byUid = (uid: string) => {
  return (item: unknown) => {
    try {
      return getUid(item) === uid;
    } catch (e) {
      console.warn('Error getting UID', item, e);
      return false;
    }
  };
};
