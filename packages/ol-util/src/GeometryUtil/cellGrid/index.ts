import { BBox, Feature, FeatureCollection, GeoJsonProperties, MultiPolygon, Polygon } from 'geojson';
import { featureCollection } from '@turf/turf';
import { rectangleCellGridStreamAsync, rectangleCellGridStreamSync } from './generator';
import { GridAlignmentOptions } from './alignment';

/**
 * 그리드 셀 생성을 위한 옵션 인터페이스
 * @typeParam P - GeoJSON Properties
 */
export interface CellGridOptions<P extends GeoJsonProperties> {
  /**
   * 경계 영역과 부분적으로 겹치는 셀도 포함할지 여부
   * - true: 경계와 일부라도 겹치는 셀 포함
   * - false: 경계 내부에 완전히 포함된 셀만 생성
   */
  includePartialCells?: boolean;

  alignment?: GridAlignmentOptions;

  /**
   * 한 번에 처리할 셀의 수
   * - 대용량 그리드 생성 시 메모리 사용량 조절을 위해 사용
   */
  batchSize?: number;

  /**
   * 그리드 생성 영역을 제한하는 마스크
   * - 마스크와 교차하는 영역에만 그리드 셀 생성
   * - Polygon 또는 MultiPolygon 형태의 GeoJSON Feature나 Geometry
   */
  mask?: Feature<Polygon | MultiPolygon> | Polygon | MultiPolygon;

  /**
   * 생성된 그리드 셀에 추가할 속성
   * - 모든 그리드 셀에 공통적으로 적용될 속성 객체
   */
  properties?: P;

  /**
   * 작업 중단을 위한 AbortSignal
   * - 긴 작업을 중간에 취소할 수 있도록 함
   */
  abortSignal?: AbortSignal;

  /**
   * 그리드 생성 진행률 콜백 함수
   * @param progress - 진행률 (0-100)
   * - async가 true일 때만 호출됨
   */
  onProgress?: (progress: number) => void;

  /**
   * 비동기 처리 여부
   * - true: 비동기적으로 그리드 생성
   * - false: 동기적으로 그리드 생성
   */
  async?: boolean;
}

export type CellGridResponse<P extends GeoJsonProperties> =
  | FeatureCollection<Polygon, P>
  | Promise<FeatureCollection<Polygon, P>>;

/**
 * 그리드 생성 모드에 따른 반환 타입 정의
 *
 * @typeParam T - 비동기 여부를 나타내는 boolean 타입 파라미터
 * @returns T가 `true`인 경우 비동기 제너레이터 반환
 * @returns T가 `false`인 경우 동기 제너레이터 반환
 */
export type StreamingMode<P extends GeoJsonProperties> =
  | Generator<Feature<Polygon, P>[], void, unknown>
  | AsyncGenerator<Feature<Polygon, P>[], void, unknown>;

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
): FeatureCollection<Polygon, P> => {
  const cells: Feature<Polygon, P>[] = [];
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
): Promise<FeatureCollection<Polygon, P>> => {
  const cells: Feature<Polygon, P>[] = [];
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
