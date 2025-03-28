import OlFeature from 'ol/Feature';
import { TRUE } from 'ol/functions.js';
import { Geometry as OlGeometry } from 'ol/geom.js';
import { FeatureFilter } from '../../Filter/predicate';
import { FeatureSources } from '../internal';
import { isCollection, isVectorSource } from '../typeGuards';

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
  } else if (isCollection<T>(source)) {
    yield* source.getArray();
  }
};
