import { booleanIntersects, difference, feature, featureCollection, intersect, polygon } from '@turf/turf';
import type { BBox, Feature, FeatureCollection, GeoJsonProperties, MultiPolygon, Polygon } from 'geojson';
import { isFeature, isFeatureCollection, isGeometry } from '../../GeoJSONUtil';
import { calculateGridStart } from './alignment';
import { CellGridMaskOptions, CellGridOptions } from './index';

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
  constructor(message = 'AbortError') {
    super(message);
    this.name = 'AbortError';
  }
}

export type MaskMode = 'include' | 'exclude';
export type MaskInput =
  | Polygon
  | MultiPolygon
  | Feature<Polygon | MultiPolygon>
  | FeatureCollection<Polygon | MultiPolygon>;

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
): Generator<Feature<Polygon | MultiPolygon, P>[], void, unknown> {
  validateInput(bbox, cellWidth, cellHeight);

  // 그리드 생성 영역 계산
  const { startX, startY, cols, rows } = calculateDimensions(bbox, cellWidth, cellHeight, options);

  const { includeBoundaryCells = true, batchSize = 100 } = options;

  let batchBuffer: Feature<Polygon | MultiPolygon, P>[] = [];

  const epsilon = 1e-10; // 부동소수점 오차 허용치

  const maskFeatures = normalizeMask(options.mask);

  for (let col = 0; col < cols; col++) {
    const x = startX + col * cellWidth;

    // 부동소수점 오차 보정
    const adjustedX = Math.round(x / epsilon) * epsilon;

    for (let row = 0; row < rows; row++) {
      const y = startY + row * cellHeight;

      const adjustedY = Math.round(y / epsilon) * epsilon;

      // 경계에 있는 셀을 포함할지 여부 확인
      if (!includeBoundaryCells && !checkBoundaryCell(adjustedX, adjustedY, cellWidth, cellHeight, bbox)) {
        continue;
      }

      // 셀 생성
      const cell = createCell(adjustedX, adjustedY, cellWidth, cellHeight, options.properties);

      // 마스크 영역과 교차하는지 확인
      if (maskFeatures) {
        const maskedCell = processMask<P>(cell, maskFeatures, options.mask!);
        if (maskedCell) {
          batchBuffer.push(maskedCell);
        }
      } else {
        batchBuffer.push(cell);
      }

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
): AsyncGenerator<Feature<Polygon | MultiPolygon, P>[], void, unknown> {
  validateInput(bbox, cellWidth, cellHeight);

  const generator = rectangleCellGridStreamSync<P>(bbox, cellWidth, cellHeight, options);
  for (const value of generator) {
    yield value;
  }
};

const normalizeMask = (options?: CellGridMaskOptions): Feature<Polygon | MultiPolygon>[] | null => {
  if (!options?.region) return null;

  if (isFeatureCollection(options.region)) {
    if (options.region.features.length === 0) return null;
    return options.region.features;
  }

  if (isGeometry(options.region)) {
    return [feature(options.region)];
  }

  if (isFeature(options.region)) {
    return [options.region];
  }

  throw new GridGenerationError('Invalid mask input: expected Feature, FeatureCollection, Polygon, or MultiPolygon');
};

const processMask = <P extends GeoJsonProperties>(
  cellFeature: Feature<Polygon, P>,
  maskFeatures: Feature<Polygon | MultiPolygon>[],
  options: CellGridMaskOptions,
): Feature<Polygon | MultiPolygon, P> | null => {
  const hasIntersection = maskFeatures.some((mask) => booleanIntersects(cellFeature, mask));
  if (options.clip) {
    const collection = featureCollection([cellFeature, ...maskFeatures]);
    // 클리핑 모드
    if (options.mode === 'exclude') {
      return difference(collection) as Feature<Polygon | MultiPolygon, P>;
    } else {
      if (hasIntersection) {
        return intersect(collection);
      }
      return null;
    }
  } else if (hasIntersection) {
    return cellFeature;
  }
  return null;
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

/**
 * 셀이 bbox 영역의 경계에 위치하는지 확인하는 함수
 * `includeBoundaryCells`가 `true`면 모든 셀 허용하고, `false`면 bbox 내부에 완전히 포함된 셀만 허용
 *
 * @param x - 셀의 시작 x 좌표
 * @param y - 셀의 시작 y 좌표
 * @param cellWidth - 셀의 너비
 * @param cellHeight - 셀의 높이
 * @param bbox - 기준이 되는 영역 [minX, minY, maxX, maxY]
 * @returns 셀이 유효한 위치에 있으면 true, 아니면 false
 */
const checkBoundaryCell = (
  x: number,
  y: number,
  cellWidth: number,
  cellHeight: number,
  [minX, minY, maxX, maxY]: BBox,
): boolean => x >= minX && x + cellWidth <= maxX && y >= minY && y + cellHeight <= maxY;

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
