import { Geometry as OlGeometry } from 'ol/geom';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON';
import { ReadOptions } from 'ol/format/Feature';
import { FeatureLike } from 'ol/Feature';
import { Feature as OlFeature } from 'ol';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { GeoJSONFormatManager } from '../index';

export type ReadFeatureOptions<T extends FeatureLike = OlFeature<OlGeometry>> = {
  format?: GeoJSONFormatOptions<T>;
  options?: ReadOptions;
};

/**
 * GeoJSON `Feature`를 OpenLayers `Feature`로 변환합니다.
 * @typeParam G - Geometry 타입 파라미터 (기본값: Geometry)
 * @param source - 변환할 GeoJSON Feature 객체
 * @param options - 변환 옵션
 * @returns OpenLayers Feature 객체
 */
export const readFeature = <G extends Geometry | null = Geometry>(source: Feature<G>, options?: ReadFeatureOptions) => {
  const format = GeoJSONFormatManager.getFormat(options?.format);
  return format.readFeature(source, options?.options);
};

/**
 * GeoJSON `Feature` 또는 `FeatureCollection`을 OpenLayers Feature 배열로 변환합니다.
 * @typeParam G - Geometry 타입 파라미터 (기본값: Geometry)
 * @param source - 변환할 GeoJSON 데이터. 단일 Feature, Feature 배열, 또는 `FeatureCollection`이 될 수 있음
 * @param options - 변환 옵션
 * @returns OpenLayers Feature 객체들의 배열
 *
 * @example
 * // 단일 Feature 변환
 * const olFeatures = readFeatures(geoJSONFeature);
 *
 * // Feature 배열 변환
 * const olFeatures = readFeatures([feature1, feature2]);
 *
 * // FeatureCollection 변환
 * const olFeatures = readFeatures(featureCollection);
 */
export const readFeatures = <G extends Geometry | null = Geometry>(
  source: Feature<G> | Feature<G>[] | FeatureCollection<G>,
  options?: ReadFeatureOptions,
): OlFeature<OlGeometry>[] => {
  const format = GeoJSONFormatManager.getFormat(options?.format);
  return format.readFeatures(source, options?.options);
};
