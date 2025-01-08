import { BBox, Feature, FeatureCollection, GeoJsonProperties, MultiPolygon, Polygon } from 'geojson';
import * as turf from '@turf/turf';

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
 * ```typescript
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

/**
 * 실제 지표면 거리를 기준으로 동일한 크기의 정사각형 그리드를 생성합니다.
 *
 * @param bbox - 그리드를 생성할 영역의 경계 상자 [minX, minY, maxX, maxY]
 * @param cellSize - 각 셀의 한 변 길이 (units 단위)
 * @param options - 그리드 생성 옵션
 *
 * @returns FeatureCollection<Polygon> - 정사각형 그리드 컬렉션
 *
 * @example
 * ```ts
 * const bbox = [126.97, 37.55, 126.98, 37.56];
 * const grid = createEqualSquareGrid(bbox, 100, { units: 'meters' });
 * ```
 */
export const createEqualSquareGrid = <P extends GeoJsonProperties = GeoJsonProperties>(
  bbox: BBox,
  cellSize: number,
  options?: {
    units?: turf.Units;
    properties?: P;
    mask?: Feature<Polygon | MultiPolygon> | Polygon | MultiPolygon;
  },
) => {
  // 경계의 가로와 세로 길이 계산
  const width = turf.distance(turf.point([bbox[0], bbox[1]]), turf.point([bbox[2], bbox[1]]), {
    units: options?.units,
  });
  const height = turf.distance(turf.point([bbox[0], bbox[1]]), turf.point([bbox[0], bbox[3]]), {
    units: options?.units,
  });

  // 가로와 세로 중 더 긴 쪽을 기준으로 셀 개수 계산
  const cellSide = Math.ceil(Math.max(width, height) / cellSize);

  return turf.squareGrid(bbox, cellSide, options);
};
