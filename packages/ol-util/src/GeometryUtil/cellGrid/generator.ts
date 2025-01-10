import { BBox, Feature, GeoJsonProperties, Polygon } from 'geojson';
import { booleanIntersects, polygon } from '@turf/turf';
import { CellGridOptions } from './index';
import { calculateGridStart } from './alignment';

/**
 * 그리드 생성 관련 에러
 */
class GridGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GridGenerationError';
  }
}

class AbortError extends GridGenerationError {
  constructor(message = 'Grid generation was aborted') {
    super(message);
    this.name = 'AbortError';
  }
}

interface GridDimensions {
  startX: number;
  startY: number;
  cols: number;
  rows: number;
}

export const rectangleCellGridStreamSync = function* <P extends GeoJsonProperties>(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: CellGridOptions<P>,
): Generator<Feature<Polygon, P>[], void, unknown> {
  validateInput(bbox, cellWidth, cellHeight);

  // 그리드 생성 영역 계산
  const { startX, startY, cols, rows } = calculateDimensions(bbox, cellWidth, cellHeight, options);

  const { includePartialCells = true, batchSize = 100 } = options;

  let batchBuffer: Feature<Polygon, P>[] = [];

  const epsilon = 1e-10; // 부동소수점 오차 허용치

  for (let col = 0; col < cols; col++) {
    const x = startX + col * cellWidth;

    // 부동소수점 오차 보정
    const adjustedX = Math.round(x / epsilon) * epsilon;

    for (let row = 0; row < rows; row++) {
      const y = startY + row * cellHeight;

      const adjustedY = Math.round(y / epsilon) * epsilon;

      if (!shouldIncludeCell(adjustedX, adjustedY, cellWidth, cellHeight, bbox, includePartialCells)) {
        continue;
      }

      // 셀 생성
      const cell = createCell(adjustedX, adjustedY, cellWidth, cellHeight, options.properties);

      // 마스크 영역과 교차하는지 확인
      if (options.mask && !booleanIntersects(options.mask, cell)) {
        continue;
      }

      batchBuffer.push(cell);

      // 배치가 가득 차면 반환
      if (batchBuffer.length >= batchSize) {
        // 배치 단위로 취소 신호를 확인한다.
        if (options.abortSignal?.aborted) {
          throw new AbortError();
        }

        yield batchBuffer;
        batchBuffer = [];
      }
    }
  }

  // 남은 버퍼 처리
  if (batchBuffer.length > 0) {
    yield batchBuffer;
  }
};

export const rectangleCellGridStreamAsync = async function* <P extends GeoJsonProperties>(
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: CellGridOptions<P>,
): AsyncGenerator<Feature<Polygon, P>[], void, unknown> {
  validateInput(bbox, cellWidth, cellHeight);

  const generator = rectangleCellGridStreamSync<P>(bbox, cellWidth, cellHeight, options);
  for (const value of generator) {
    yield value;
  }
};

/**
 * 그리드 크기 계산
 */
const calculateDimensions = (
  bbox: BBox,
  cellWidth: number,
  cellHeight: number,
  options: CellGridOptions<any> = {},
): GridDimensions => {
  const [minX, minY, maxX, maxY] = bbox;

  // 시작점
  const startX = calculateGridStart(minX, cellWidth, options.alignment);
  const startY = calculateGridStart(minY, cellHeight, options.alignment);

  // // startX가 minX보다 크면 한 셀 앞으로 이동
  // const adjustedStartX = startX > minX ? startX - cellWidth : startX;
  // const adjustedStartY = startY > minY ? startY - cellHeight : startY;

  // 그리드 크기 계산
  const cols = Math.ceil((maxX - startX) / cellWidth);
  const rows = Math.ceil((maxY - startY) / cellHeight);

  return { startX, startY, cols, rows };
};

/**
 * 그리드 셀을 생성하는 함수
 */
const createCell = <P extends GeoJsonProperties>(
  x: number,
  y: number,
  width: number,
  height: number,
  properties?: P,
): Feature<Polygon, P> => {
  return polygon(
    [
      [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
        [x, y],
      ],
    ],
    properties,
  );
};

const shouldIncludeCell = (
  x: number,
  y: number,
  cellWidth: number,
  cellHeight: number,
  bbox: BBox,
  includePartialCells: boolean,
): boolean => {
  if (includePartialCells) return true;

  const [minX, minY, maxX, maxY] = bbox;
  const x2 = x + cellWidth;
  const y2 = y + cellHeight;
  return x >= minX && x2 <= maxX && y >= minY && y2 <= maxY;
};

/**
 * 입력값 검증
 */
const validateInput = (bbox: BBox, cellWidth: number, cellHeight: number) => {
  if (!isValidBBox(bbox)) {
    throw new GridGenerationError(`Invalid bbox: expected [minX, minY, maxX, maxY], got [${bbox.join(', ')}]`);
  }
  if (cellWidth <= 0 || cellHeight <= 0) {
    throw new GridGenerationError(
      `Invalid cell dimensions: width and height must be greater than 0, got [${cellWidth}, ${cellHeight}]`,
    );
  }
};

/**
 * bbox 유효성 검사
 */
const isValidBBox = (bbox: BBox): boolean => {
  const [minX, minY, maxX, maxY] = bbox;
  return Array.isArray(bbox) && bbox.length === 4 && minX <= maxX && minY <= maxY;
};
