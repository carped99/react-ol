import { byValue } from './index';

/**
 * ID 기반 필터링을 위한 특수 케이스
 */
export const byIdValue = <
  T extends {
    id: V;
  },
  V,
>(
  id: V | readonly V[] | undefined | null,
) => byValue<T, 'id', V>('id', id);
