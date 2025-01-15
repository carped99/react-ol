import { Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
import { isFeatureCollection, isVectorSource } from '../typeGuards';
import { FeatureSources } from '../internal';
import { FeatureFilter } from '../../Filter/predicate';
import { TRUE } from 'ol/functions';

/**
 * 주어진 소스의 피처들을 순회하는 제너레이터 함수입니다.
 * @experimental
 * @typeParam T - 피처의 지오메트리 타입
 * @param source - 피처를 순회할 소스 (VectorSource, VectorLayer, Feature 배열 등)
 * @param filter - 필터링 함수
 */
export const iterateFeature = function* <T extends OlGeometry>(
  source?: FeatureSources<T> | null,
  filter: FeatureFilter<T> = TRUE,
): Generator<OlFeature<T>> {
  if (!source) return;
  for (const feature of iterateFeatureInternal(source)) {
    if (filter(feature)) {
      yield feature;
    }
  }
};

const iterateFeatureInternal = function* <T extends OlGeometry>(source: FeatureSources<T>): Generator<OlFeature<T>> {
  if (Array.isArray(source)) {
    yield* source;
  } else if (isVectorSource<T>(source)) {
    yield* source.getFeatures();
  } else if (isFeatureCollection<T>(source)) {
    yield* source.getArray();
  }
};
