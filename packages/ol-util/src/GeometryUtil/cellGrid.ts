import { Feature, FeatureCollection, Polygon } from 'geojson';
import { featureCollection, polygon } from '@turf/turf';

type BBox = [minX: number, minY: number, maxX: number, maxY: number];

interface GridOptions {
  includePartialCells?: boolean;
  alignmentPoint?: [x: number, y: number];
  batchSize?: number;
  onProgress?: (progress: number) => void;
  abortSignal?: AbortSignal;
  /** 메모리 사용량 제한 (MB) */
  memoryLimit?: number;
  /** 셀 생성 전 유효성 검사 콜백 */
  cellValidator?: (x: number, y: number) => boolean | Promise<boolean>;
}

interface GridResult {
  grid: FeatureCollection<Polygon>;
  completed: boolean;
  cellCount: number;
  executionTime: number;
}

interface GridDimensions {
  cols: number;
  rows: number;
  totalCells: number;
  estimatedMemory: number;
}

/**
 * 그리드 크기 및 메모리 사용량 계산
 */
function calculateGridDimensions(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  startX: number,
  startY: number,
): GridDimensions {
  const [, , maxX, maxY] = bbox;
  const cols = Math.ceil((maxX - startX) / cellWidth);
  const rows = Math.ceil((maxY - startY) / cellHeight);
  const totalCells = cols * rows;

  // 셀 하나당 대략적인 메모리 사용량 (바이트)
  const bytesPerCell = 200; // 좌표, 메타데이터 등
  const estimatedMemory = (totalCells * bytesPerCell) / (1024 * 1024); // MB

  return { cols, rows, totalCells, estimatedMemory };
}

/**
 * 메모리 사용량 확인
 */
// function checkMemoryUsage(limit?: number): number {
//   if (typeof process !== 'undefined' && process.memoryUsage) {
//     const { heapUsed } = process.memoryUsage();
//     const memoryUsageMB = heapUsed / (1024 * 1024);
//
//     if (limit && memoryUsageMB > limit) {
//       throw new Error(`Memory limit exceeded: ${memoryUsageMB.toFixed(2)}MB used`);
//     }
//
//     return memoryUsageMB;
//   }
//   return 0;
// }

/**
 * 그리드 셀 생성
 */
function createCell(x: number, y: number, width: number, height: number): Feature<Polygon> {
  return polygon([
    [
      [x, y], // 좌하단
      [x + width, y], // 우하단
      [x + width, y + height], // 우상단
      [x, y + height], // 좌상단
      [x, y], // 닫힘 (좌하단)
    ],
  ]);
}

function shouldIncludeCell(
  x: number,
  y: number,
  cellWidth: number,
  cellHeight: number,
  bbox: BBox,
  includePartialCells: boolean,
): boolean {
  if (includePartialCells) return true;

  const [minX, minY, maxX, maxY] = bbox;
  const x2 = x + cellWidth;
  const y2 = y + cellHeight;
  return x >= minX && x2 <= maxX && y >= minY && y2 <= maxY;
}

/**
 * 그리드 시작점 계산
 */
function calculateStart(min: number, cellSize: number, alignmentPoint?: number): number {
  if (alignmentPoint !== undefined) {
    const offset = min - alignmentPoint;
    const cells = Math.floor(offset / cellSize);
    return alignmentPoint + cells * cellSize;
  }
  return Math.ceil(min / cellSize) * cellSize;
}

/**
 * 직사각형 셀로 구성된 그리드 생성
 * @example
 * ```
 * try {
 *   const result = await rectangleCellGrid(
 *     [200000, 400000, 300000, 500000],
 *     1000,
 *     1000,
 *     {
 *       maxCellsPerBatch: 500,
 *       memoryLimit: 512, // 512MB 제한
 *       onProgress: (progress) => {
 *         console.log(`Progress: ${Math.round(progress * 100)}%`);
 *       },
 *       abortSignal: controller.signal,
 *       // 선택적 셀 유효성 검사
 *       cellValidator: async (x, y) => {
 *         // 예: 특정 영역 제외
 *         return !(x > 250000 && y > 450000);
 *       }
 *     }
 *   );
 *
 *   console.log(`
 *     Completed: ${result.completed}
 *     Cells: ${result.cellCount}
 *     Memory: ${result.memoryUsage.toFixed(2)}MB
 *     Time: ${result.executionTime.toFixed(2)}ms
 *   `);
 *
 * } catch (error) {
 *   if (error.message.includes('Memory limit exceeded')) {
 *     console.error('메모리 사용량이 너무 높습니다.');
 *   }
 *   throw error;
 * }
 * ```
 */
export async function rectangleCellGrid(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: GridOptions = {},
): Promise<GridResult> {
  const cells: Feature<Polygon>[] = [];
  const startTime = performance.now();

  for await (const batch of streamingCellGrid(bbox, cellWidth, cellHeight, options)) {
    cells.push(...batch);
  }

  return {
    grid: featureCollection(cells),
    completed: !options.abortSignal?.aborted,
    cellCount: cells.length,
    executionTime: performance.now() - startTime,
  };
}

export async function squareCellGrid(bbox: BBox, cellSize: number, options: GridOptions = {}): Promise<GridResult> {
  return rectangleCellGrid(bbox, cellSize, cellSize, options);
}

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
 *
 * @throws {Error} bbox가 유효하지 않은 경우
 * @throws {Error} cellWidth 또는 cellHeight가 0 이하인 경우
 */
export async function* streamingCellGrid(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: GridOptions = {},
): AsyncGenerator<Feature<Polygon>[], void, unknown> {
  // 입력값 검증
  if (!isValidBBox(bbox)) {
    throw new Error('Invalid bbox: [minX, minY, maxX, maxY] expected');
  }
  if (cellWidth <= 0 || cellHeight <= 0) {
    throw new Error('Cell dimensions must be greater than 0');
  }

  const { includePartialCells = true, alignmentPoint, abortSignal, cellValidator, batchSize = 100 } = options;

  const [minX, minY] = bbox;
  const startX = calculateStart(minX, cellWidth, alignmentPoint?.[0]);
  const startY = calculateStart(minY, cellHeight, alignmentPoint?.[1]);

  const dimensions = calculateGridDimensions(bbox, cellWidth, cellHeight, startX, startY);

  let batchBuffer: Feature<Polygon>[] = [];

  for (let col = 0; col < dimensions.cols; col++) {
    const x = startX + col * cellWidth;

    for (let row = 0; row < dimensions.rows; row++) {
      const y = startY + row * cellHeight;

      if (cellValidator && !(await cellValidator(x, y))) {
        continue;
      }

      if (shouldIncludeCell(x, y, cellWidth, cellHeight, bbox, includePartialCells)) {
        batchBuffer.push(createCell(x, y, cellWidth, cellHeight));
      }

      // 배치가 가득 차면 반환
      if (batchBuffer.length >= batchSize) {
        if (abortSignal?.aborted) return;
        yield batchBuffer;
        batchBuffer = [];
      }
    }
  }

  // flush buffer
  if (batchBuffer.length > 0) {
    yield batchBuffer;
  }
}

/**
 * bbox 유효성 검사
 */
function isValidBBox(bbox: BBox): boolean {
  const [minX, minY, maxX, maxY] = bbox;
  return Array.isArray(bbox) && bbox.length === 4 && minX <= maxX && minY <= maxY;
}
