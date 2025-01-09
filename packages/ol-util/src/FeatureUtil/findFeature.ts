import { Collection, Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { isFeatureCollection, isVectorSource } from './FeatureGuard';
import { AlwaysTrue } from '../Filter/type';
import { FeatureFilter } from '../Filter';

// 타입 정의
export type FeatureSources<T extends OlGeometry> =
  | OlFeature<T>[]
  | Collection<OlFeature<T>>
  | VectorSource<OlFeature<T>>;

/**
 * 주어진 조건에 맞는 모든 피처를 찾습니다.
 * @public
 * @typeParam T - 피처의 지오메트리 타입
 * @param source - 피처를 검색할 소스 (Feature[], Collection, VectorSource, VectorLayer 등)
 * @param filter - 필터 조건 함수 (선택적)
 * @returns 조건에 맞는 피처 배열
 * @example
 * ```
 * // 모든 피처 반환
 * const allFeatures = findAllFeatures(source);
 *
 * // 특정 조건의 피처만 반환
 * const selectedFeatures = findAllFeatures(source,
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

/**
 * 주어진 소스에서 조건에 맞는 첫 번째 피처를 찾습니다.
 * @public
 * @typeParam T - 피처의 지오메트리 타입
 * @param source - 피처를 검색할 소스 (Feature[], Collection, VectorSource, VectorLayer 등)
 * @param filter - 피처 필터링 함수 (기본값: AlwaysTrue)
 * @returns 조건에 맞는 첫 번째 피처 또는 undefined
 *
 * @example
 * ```typescript
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
  filter: FeatureFilter<T> = AlwaysTrue,
): OlFeature<T> | undefined => {
  return source ? resolveFeatureArray(source).find(filter) : undefined;
};

/**
 * 주어진 소스의 피처들을 순회하는 제너레이터 함수입니다.
 * @experimental
 * @typeParam T - 피처의 지오메트리 타입
 * @param source - 피처를 순회할 소스 (VectorSource, VectorLayer, Feature 배열 등)
 * @param filter - 피처 필터링 함수 (기본값: AlwaysTrue)
 */
export const iterateFeature = function* <T extends OlGeometry>(
  source?: FeatureSources<T> | null,
  filter: FeatureFilter<T> = AlwaysTrue,
): Generator<OlFeature<T>> {
  if (!source) return;
  for (const feature of iterateFeatureInternal(source)) {
    if (filter(feature)) {
      yield feature;
    }
  }
};

const iterateFeatureInternal = <T extends OlGeometry>(source: FeatureSources<T>): Generator<OlFeature<T>> => {
  return (function* () {
    if (Array.isArray(source)) {
      yield* source;
    } else if (isVectorSource<T>(source)) {
      yield* source.getFeatures();
    } else if (isFeatureCollection<T>(source)) {
      yield* source.getArray();
    }
  })();
};

const resolveFeatureArray = <T extends OlGeometry>(source: FeatureSources<T>): OlFeature<T>[] => {
  if (Array.isArray(source)) {
    return source;
  } else if (isVectorSource<T>(source)) {
    return source.getFeatures();
  } else if (isFeatureCollection<T>(source)) {
    return source.getArray();
  }
  throw new TypeError('Invalid source type');
};
