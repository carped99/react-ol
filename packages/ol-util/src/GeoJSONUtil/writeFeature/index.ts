import type { Feature, FeatureCollection, GeometryCollection } from 'geojson';
import OlFeature from 'ol/Feature.js';
import { WriteOptions } from 'ol/format/Feature.js';
import GeoJSON, { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON.js';

import { Geometry as OlGeometry } from 'ol/geom.js';
import { ToGeoJSONGeometry } from '../typeGuards/typeMapping';

export type WriteFeatureOptions<T extends OlGeometry> = {
  format?: GeoJSONFormatOptions<OlFeature<T>>;
  options?: WriteOptions;
};

export type WriteSanitizedFeatureOptions<T extends OlGeometry> = WriteFeatureOptions<T> & {
  sanitizer?: (feature: OlFeature<T>) => OlFeature<T>;
};

/**
 * OpenLayers `Feature`를 GeoJSON `Feature`로 변환합니다.
 * @typeParam T - OpenLayers Geometry 타입 파라미터
 * @param feature - 변환할 OpenLayers Feature 객체
 * @param options - 변환 옵션
 * @returns GeoJSON Feature 객체
 *
 * @example
 * ```ts
 * const olFeature = new OlFeature({
 *   geometry: new Point([126.978, 37.566])
 * });
 * const geoJSONFeature = writeFeature(olFeature);
 * ```
 */
export const writeFeature = <T extends OlGeometry>(feature: OlFeature<T>, options?: WriteFeatureOptions<T>) => {
  // const format = GeoJSONFormatManager.getFormat(options?.format);
  const format = new GeoJSON(options?.format);
  return format.writeFeatureObject(feature, options?.options) as Feature<ToGeoJSONGeometry<T>>;
};

/**
 * OpenLayers Feature 배열을 GeoJSON `FeatureCollection`으로 변환합니다.
 * @typeParam T - OpenLayers Geometry 타입 파라미터
 * @param features - 변환할 OpenLayers Feature 객체들의 배열
 * @param options - 변환 옵션
 * @returns GeoJSON FeatureCollection 객체
 *
 * @example
 * ```ts
 * const olFeatures = [
 *   new OlFeature({ geometry: new Point([126.978, 37.566]) }),
 *   new OlFeature({ geometry: new Point([127.002, 37.538]) })
 * ];
 * const featureCollection = writeFeatures(olFeatures);
 *```
 */
export const writeFeatures = <T extends OlGeometry>(features: OlFeature<T>[], options?: WriteFeatureOptions<T>) => {
  // const format = GeoJSONFormatManager.getFormat(options?.format);
  const format = new GeoJSON(options?.format);
  return format.writeFeaturesObject(features, options?.options) as FeatureCollection<ToGeoJSONGeometry<T>>;
};

export const writeGeometry = <T extends OlGeometry>(geometry: T, options?: WriteFeatureOptions<T>) => {
  // const format = GeoJSONFormatManager.getFormat(options?.format);
  const format = new GeoJSON(options?.format);
  return format.writeGeometryObject(geometry, options?.options) as
    | ToGeoJSONGeometry<T>
    | GeometryCollection<ToGeoJSONGeometry<T>>;
};

export const writeFeatureSanitized = <T extends OlGeometry>(
  feature: OlFeature<T>,
  options?: WriteSanitizedFeatureOptions<T>,
) => {
  const sanitizer = options?.sanitizer ?? sanitizeFeature;
  return writeFeature(sanitizer(feature), options);
};

export const writeFeaturesSanitized = <T extends OlGeometry>(
  features: OlFeature<T>[],
  options?: WriteSanitizedFeatureOptions<T>,
) => {
  const sanitizer = options?.sanitizer ?? sanitizeFeature;
  return writeFeatures(features.map(sanitizer), options);
};

const sanitizeFeature = <T extends OlGeometry>(feature: OlFeature<T>) => {
  const cloned = feature.clone();
  cloned.setId(feature.getId());

  for (const key of cloned.getKeys()) {
    if (key.startsWith('_') && key.endsWith('_')) {
      cloned.unset(key);
    }
  }

  return cloned;
};
