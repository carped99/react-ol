import { featureCollection, flatten } from '@turf/turf';
import { Feature, MultiPolygon, Polygon } from 'geojson';
import { Feature as OlFeature } from 'ol';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON';
import { LineString as OlLineString, MultiPolygon as OlMultiPolygon, Polygon as OlPolygon } from 'ol/geom';
import polygonSplitter from 'polygon-splitter';
import { readGeometry, writeFeatureObject, writeGeometryObject } from '../GeoJSONUtil/GeoJSONFormat';
import { intersectPolygon } from '../GeoJSONUtil/GeoJSONApi';

/**
 * 폴리곤을 라인으로 분할하는 내부 함수입니다.
 *
 * @param polygon - 분할할 폴리곤
 * @param line - 분할에 사용할 라인
 * @param options - GeoJSON 변환 옵션
 * @returns 분할된 폴리곤 배열
 *
 * @internal
 */
export const splitPolygonByLine = (
  polygon: OlPolygon,
  line: OlLineString,
  options?: GeoJSONFormatOptions,
): OlPolygon[] => {
  const polyJson = writeGeometryObject(polygon, options);
  const lineJson = writeGeometryObject(line, options);

  return flatten(polygonSplitter(polyJson, lineJson)).features.map(
    (feature) => readGeometry(feature.geometry, options) as OlPolygon,
  );
};

/**
 * 두 폴리곤의 교차 영역을 계산합니다.
 *
 * @param polygon1 - 첫 번째 폴리곤
 * @param polygon2 - 두 번째 폴리곤
 * @param format - GeoJSON 변환 옵션
 * @returns 교차 영역 폴리곤 (교차하지 않는 경우 undefined)
 *
 * @example
 * ```typescript
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
