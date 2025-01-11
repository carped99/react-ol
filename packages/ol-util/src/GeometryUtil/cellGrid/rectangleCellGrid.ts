import { BBox, Feature, FeatureCollection, GeoJsonProperties, MultiPolygon, Polygon } from 'geojson';
import { rectangleCellGridStreamAsync, rectangleCellGridStreamSync } from './generator';
import { featureCollection } from '@turf/turf';
import { CellGridOptions, StreamingMode } from './index';

/**
 * 직사각형 그리드 셀을 생성하는 함수
 *
 * @typeParam P - GeoJSON 속성 타입
 * @typeParam A - 비동기 처리 여부 (true: 비동기, false: 동기)
 *
 * @param bbox - 그리드를 생성할 영역 [minX, minY, maxX, maxY]
 * @param cellWidth - 셀의 너비
 * @param cellHeight - 셀의 높이
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
export const rectangleCellGrid = <P extends GeoJsonProperties, O extends CellGridOptions<P> = CellGridOptions<P>>(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options?: O,
): O extends {
  async: true;
}
  ? Promise<FeatureCollection<Polygon, P>>
  : FeatureCollection<Polygon, P> => {
  const { async = false, ...restOptions } = options || {};
  return (async ? rectangleCellGridAsync : rectangleCellGridSync)(bbox, cellWidth, cellHeight, restOptions) as any;
};

const rectangleCellGridSync = <P extends GeoJsonProperties>(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: CellGridOptions<P>,
): FeatureCollection<Polygon | MultiPolygon, P> => {
  const cells: Feature<Polygon | MultiPolygon, P>[] = [];
  const generator = rectangleCellGridStreamSync(bbox, cellWidth, cellHeight, options);

  let result = generator.next();
  while (!result.done) {
    if (result.value) {
      cells.push(...result.value);
    }
    result = generator.next();
  }

  return featureCollection(cells);
};

const rectangleCellGridAsync = async <P extends GeoJsonProperties>(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: CellGridOptions<P>,
): Promise<FeatureCollection<Polygon | MultiPolygon, P>> => {
  const cells: Feature<Polygon | MultiPolygon, P>[] = [];
  for await (const batch of rectangleCellGridStreamAsync<P>(bbox, cellWidth, cellHeight, options)) {
    cells.push(...batch);
  }

  return featureCollection(cells);
};

/**
 * 스트리밍 방식으로 그리드 셀을 생성하는 제너레이터 함수
 *
 * @param bbox - 그리뎌 영역 [minX, minY, maxX, maxY]
 * @param cellWidth - 셀의 너비
 * @param cellHeight - 셀의 높이
 * @param options - 그리드 생성 옵션
 *
 * @example
 * ```ts
 * // 기본 사용
 * const cellStream = streamingCellGrid([0, 0, 1000, 1000], 100, 100);
 * for await (const batch of cellStream) {
 *   // 각 셀 처리
 * }
 * ```
 *
 * @example
 * ```ts
 * // 취소 가능한 스트리밍
 * const controller = new AbortController();
 * const cellStream = streamingCellGrid(bbox, width, height, {
 *   abortSignal: controller.signal
 * });
 * ```
 *
 * @example
 * ```ts
 * // 셀 필터링
 * const cellStream = streamingCellGrid(bbox, width, height, {
 *   cellValidator: async (x, y) => {
 *     return await isValidLocation(x, y);
 *   }
 * });
 * ```
 */
export const rectangleCellGridStream = <P extends GeoJsonProperties = GeoJsonProperties>(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: CellGridOptions<P>,
): StreamingMode<P> => {
  const { async = false, ...restOptions } = options;

  // 옵션에 따라 동기 또는 비동기 제너레이터 선택
  return (async ? rectangleCellGridStreamAsync<P> : rectangleCellGridStreamSync<P>)(
    bbox,
    cellWidth,
    cellHeight,
    restOptions,
  ) as StreamingMode<P>;
};
