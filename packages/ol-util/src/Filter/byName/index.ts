import { Predicate } from '../predicate';
import BaseObject from 'ol/Object';
import { FALSE } from 'ol/functions';

/**
 * 이름 필터를 위한 타입
 */
type NameFilter = string | string[] | readonly string[];

/**
 * 주어진 이름과 일치하는 객체를 찾는 필터 함수를 생성합니다.
 *
 *
 * @example
 * ```ts
 * // 단일 객체 필터링
 * const item = items.find(byName('example'));
 *```
 *
 * @example
 * ```ts
 * // 배열 필터링
 * const filteredItems = items.filter(byName('example'));
 *```
 *
 * @example
 * ```ts
 * // 복합 조건과 함께 사용
 * const items = array.filter(item =>
 *   byName('example')(item) &&
 *   item.active === true
 * );
 *```
 */
export const byName = (...names: NameFilter[]): Predicate<BaseObject> => {
  const flatNames = names.flat();
  if (flatNames.length === 0) {
    return FALSE;
  }
  return (item) => {
    const layerName = item.get('name');
    return typeof layerName === 'string' && flatNames.includes(layerName);
  };
};
