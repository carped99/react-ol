import { Feature, GeoJsonProperties, Polygon } from 'geojson';
import { MaskInput, MaskMode } from './generator';

export * from './rectangleCellGrid';
export * from './squareCellGrid';

// enum 대신 union type으로 변경
export type CellGridAlignment = 'ceiling' | 'floor' | 'round' | 'center' | 'nearest';

// 상수 객체로 제공 (선택사항)
export const CellGridAlignment = {
  CEILING: 'ceiling' as const,
  FLOOR: 'floor' as const,
  ROUND: 'round' as const,
  CENTER: 'center' as const,
  NEAREST: 'nearest' as const,
} as const;

/**
 * 그리드 정렬 옵션 인터페이스
 */
export interface CellGridAlignmentOptions {
  /** 그리드 정렬 방식 (기본값: CEILING) */
  alignment?: CellGridAlignment;

  /** 정렬 기준점으로부터의 오프셋 값 (기본값: 0) */
  offset?: number;

  /** 최소값에 스냅할지 여부 (기본값: true) */
  snapToMin?: boolean;
}

export interface CellGridMaskOptions {
  /** 그리드 생성 영역을 제한하는 마스크 */
  region: MaskInput;
  mode?: MaskMode;
  clip?: boolean;
}

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
  includeBoundaryCells?: boolean;

  alignment?: CellGridAlignmentOptions;

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
  mask?: CellGridMaskOptions;

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
