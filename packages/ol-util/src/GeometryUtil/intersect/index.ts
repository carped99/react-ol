import { featureCollection } from '@turf/turf';
import type { Feature, MultiPolygon, Polygon } from 'geojson';
import OlFeature from 'ol/Feature.js';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON.js';
import { MultiPolygon as OlMultiPolygon, Polygon as OlPolygon } from 'ol/geom.js';
import { intersectPolygon } from '../../GeoJSONUtil/GeoJSONApi';
import { readGeometry, writeFeatureObject } from '../../GeoJSONUtil/GeoJSONFormat';

/**
 * 두 폴리곤의 교차 영역을 계산합니다.
 *
 * @param polygon1 - 첫 번째 폴리곤
 * @param polygon2 - 두 번째 폴리곤
 * @param format - GeoJSON 변환 옵션
 * @returns 교차 영역 폴리곤 (교차하지 않는 경우 undefined)
 *
 * @example
 * ```ts
 * const intersection = intersectGeometry(polygon1, polygon2);
 * if (intersection) {
 *   console.log('Polygons intersect');
 * }
 * ```
 */
export const intersectGeometry = (
  polygon1: OlPolygon | OlMultiPolygon,
  polygon2: OlPolygon | OlMultiPolygon,
  format?: GeoJSONFormatOptions,
): OlPolygon | OlMultiPolygon | null => {
  const geojson1 =
    polygon1 instanceof OlMultiPolygon
      ? (writeFeatureObject(new OlFeature(polygon1), format) as Feature<MultiPolygon>)
      : (writeFeatureObject(new OlFeature(polygon1), format) as Feature<Polygon>);

  const geojson2 =
    polygon2 instanceof OlMultiPolygon
      ? (writeFeatureObject(new OlFeature(polygon2), format) as Feature<MultiPolygon>)
      : (writeFeatureObject(new OlFeature(polygon2), format) as Feature<Polygon>);

  const collection = featureCollection<Polygon | MultiPolygon>([geojson1, geojson2]);
  const intersection = intersectPolygon(collection);

  if (!intersection) {
    return null;
  }

  return readGeometry(intersection.geometry, format) as OlPolygon | OlMultiPolygon;
};
