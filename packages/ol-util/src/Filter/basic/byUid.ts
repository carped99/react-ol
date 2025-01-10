import { getUid } from 'ol';

export const byUid = (uid: string) => {
  return (item: any) => {
    try {
      return getUid(item) === uid;
    } catch (e) {
      console.warn('Error getting UID', item, e);
      return false;
    }
  };
};
