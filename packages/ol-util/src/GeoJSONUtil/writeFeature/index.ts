import { Geometry as OlGeometry } from 'ol/geom';
import { Feature as OlFeature } from 'ol';
import { Feature, FeatureCollection, GeometryCollection } from 'geojson';
import { WriteOptions } from 'ol/format/Feature';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON';
import { ToGeoJSONGeometry } from '../typeGuards/typeMapping';
import { GeoJSON } from 'ol/format';

export type WriteFeatureOptions<T extends OlGeometry> = {
  format?: GeoJSONFormatOptions<OlFeature<T>>;
  options?: WriteOptions;
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
