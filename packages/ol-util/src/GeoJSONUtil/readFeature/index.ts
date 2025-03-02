import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import OlFeature, { FeatureLike } from 'ol/Feature.js';
import { ReadOptions } from 'ol/format/Feature.js';
import GeoJSON, { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON.js';

import { Geometry as OlGeometry } from 'ol/geom.js';
import { ToOlGeometry } from '../typeGuards/typeMapping';

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
export const readFeature = <T extends Geometry = Geometry, P extends GeoJsonProperties = GeoJsonProperties>(
  source: Feature<T, P>,
  options?: ReadFeatureOptions,
) => {
  // const format = GeoJSONFormatManager.getFormat(options?.format);
  const format = new GeoJSON(options?.format);
  return format.readFeature(source, options?.options) as OlFeature<ToOlGeometry<T>>;
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
export const readFeatures = <T extends Geometry = Geometry>(
  source: Feature<T, any> | Feature<T, any>[] | FeatureCollection<T, any> | Document | Element | ArrayBuffer | string,
  options?: ReadFeatureOptions,
): OlFeature<ToOlGeometry<T>>[] => {
  const format = new GeoJSON(options?.format);
  return format.readFeatures(source, options?.options) as OlFeature<ToOlGeometry<T>>[];
};

export const readGeometry = <T extends Geometry = Geometry>(
  source: T | Document | Element | string,
  options?: ReadFeatureOptions,
): ToOlGeometry<T> => {
  // const format = GeoJSONFormatManager.getFormat(options?.format);
  const format = new GeoJSON(options?.format);
  return format.readGeometry(source, options?.options) as ToOlGeometry<T>;
};
