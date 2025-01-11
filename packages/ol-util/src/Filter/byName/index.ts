import { byProperty } from '../byProperty';

/**
 * 주어진 이름과 일치하는 객체를 찾는 필터 함수를 생성합니다.
 *
 * @param  name - 검색할 이름
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
export const byName = (name: string) => {
  return byProperty('name', name);
};
