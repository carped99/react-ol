import { Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
import { FeatureSources, resolveFeatureArray } from '../internal';
import { FeatureFilter } from '../../Filter/predicate';
import { TRUE } from 'ol/functions';

/**
 * 주어진 소스에서 조건에 맞는 첫 번째 피처를 찾습니다.
 * @public
 * @typeParam T - 피처의 지오메트리 타입
 * @param source - 피처를 검색할 소스 (Feature[], Collection, VectorSource, VectorLayer 등)
 * @param filter - 필터링 함수
 * @returns 조건에 맞는 첫 번째 피처 또는 undefined
 *
 * @example
 * ```ts
 * // 첫 번째 포인트 피처 찾기
 * const point = findOneFeature(source, FeatureFilters.byGeometryType('Point'));
 *
 * // ID로 피처 찾기
 * const feature = findOneFeature(source, FeatureFilters.byId('feature-1'));
 *
 * // 모든 속성이 일치하는 피처 찾기
 * const feature = findOneFeature(source, FeatureFilters.byProperties({
 *   type: 'poi',
 *   category: 'restaurant'
 * }));
 * ```
 */
export const findOneFeature = <T extends OlGeometry>(
  source?: FeatureSources<T> | null,
  filter: FeatureFilter<T> = TRUE,
): OlFeature<T> | undefined => {
  return source ? resolveFeatureArray(source).find(filter) : undefined;
};
