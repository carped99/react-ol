import { BBox, FeatureCollection, GeoJsonProperties, Polygon } from 'geojson';
import { CellGridOptions } from './index';
import { rectangleCellGrid } from './rectangleCellGrid';

/**
 * 정사각형 그리드 셀을 생성하는 함수
 *
 * @typeParam P - GeoJSON 속성 타입
 * @typeParam A - 비동기 처리 여부 (true: 비동기, false: 동기)
 *
 * @param bbox - 그리드를 생성할 영역 [minX, minY, maxX, maxY]
 * @param cellSize - 셀의 크기
 * @param options - 그리드 생성 옵션
 *
 * @example
 * ```ts
 * const grid = rectangleCellGrid([0, 0, 100, 100], 10, 10);
 *```
 * @example
 * ```ts
 * const asyncGrid = rectangleCellGrid([0, 0, 100, 100], 10, 10, { async: true });
 * ```
 */
export const squareCellGrid = <P extends GeoJsonProperties, O extends CellGridOptions<P> = CellGridOptions<P>>(
  bbox: BBox,
  cellSize: number,
  options?: O,
): O extends {
  async: true;
}
  ? Promise<FeatureCollection<Polygon, P>>
  : FeatureCollection<Polygon, P> => {
  return rectangleCellGrid(bbox, cellSize, cellSize, options);
};
