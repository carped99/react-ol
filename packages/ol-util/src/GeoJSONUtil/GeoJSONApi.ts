import * as turf from '@turf/turf';
import type { BBox, Feature, FeatureCollection, GeoJsonProperties, MultiPolygon, Polygon } from 'geojson';

/**
 * 두 경계 상자(BBox)의 교집합을 계산합니다.
 *
 * @param bbox1 - 첫 번째 경계 상자 [minX, minY, maxX, maxY]
 * @param bbox2 - 두 번째 경계 상자 [minX, minY, maxX, maxY]
 *
 * @returns BBox | null - 교집합 경계 상자 또는 교집합이 없는 경우 null
 *
 * @example
 * ```ts
 * const bbox1: BBox = [0, 0, 2, 2];
 * const bbox2: BBox = [1, 1, 3, 3];
 * const result = intersectBbox(bbox1, bbox2); // [1, 1, 2, 2]
 * ```
 */
export const intersectBbox = (bbox1: BBox, bbox2: BBox): BBox | null => {
  const [minX1, minY1, maxX1, maxY1] = bbox1;
  const [minX2, minY2, maxX2, maxY2] = bbox2;

  const minX = Math.max(minX1, minX2);
  const minY = Math.max(minY1, minY2);
  const maxX = Math.min(maxX1, maxX2);
  const maxY = Math.min(maxY1, maxY2);

  if (minX > maxX || minY > maxY) return null;

  return [minX, minY, maxX, maxY] as BBox;
};

/**
 * 두 폴리곤의 교차 영역을 계산합니다.
 *
 * @returns 교차 영역 폴리곤 (교차하지 않는 경우 undefined)
 *
 * @example
 * ```ts
 * const intersection = intersectGeometry(polygon1, polygon2);
 * if (intersection) {
 *   console.log('Polygons intersect');
 * }
 * ```
 * @param features
 * @param options
 */
export const intersectPolygon = <P extends GeoJsonProperties = GeoJsonProperties>(
  features: FeatureCollection<Polygon | MultiPolygon>,
  options?: {
    properties?: P;
  },
): Feature<Polygon | MultiPolygon, P> | null => {
  return turf.intersect(features, options);
};
