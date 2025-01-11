import { Geometry as OlGeometry } from 'ol/geom';
import { AlwaysTrue, FeatureFilter } from '../../Filter/predicate';
import { FeatureSources, resolveFeatureArray } from '../internal';

/**
 * 주어진 조건에 맞는 모든 피처를 찾습니다.
 * @public
 * @typeParam T - 피처의 지오메트리 타입
 * @param source - 피처를 검색할 소스 (Feature[], Collection, VectorSource, VectorLayer 등)
 * @param filter - 필터링 함수
 * @returns 조건에 맞는 피처 배열
 * @example
 * ```
 * // 모든 피처 반환
 * const allFeatures = findAllFeature(source);
 *
 * // 특정 조건의 피처만 반환
 * const selectedFeatures = findAllFeature(source,
 *   feature => feature.get('type') === 'point'
 * );
 * ```
 */
export const findAllFeature = <T extends OlGeometry>(
  source?: FeatureSources<T> | null,
  filter: FeatureFilter<T> = AlwaysTrue,
) => {
  return source ? resolveFeatureArray(source).filter(filter) : [];
};
