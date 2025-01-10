import { Coordinate } from 'ol/coordinate';
import Map from 'ol/Map';
import { AnimationOptions } from 'ol/View';
import { METERS_PER_UNIT, Units } from 'ol/proj/Units';
import { findAllLayer } from './basic';
import { AlwaysTrue, LayerFilter } from '../Filter/predicate';

// 상수 정의
const INCHES_PER_METER = 39.37;
const DOTS_PER_INCH = 25.4 / 0.28;

/**
 * 지도의 중심점을 변경합니다.
 * @param map - OpenLayers Map 인스턴스
 * @param coordinate - 새로운 중심 좌표
 * @param options - 애니메이션 옵션
 */
export const setMapCenter = (map: Map, coordinate: Coordinate, options?: Omit<AnimationOptions, 'center'>) => {
  const view = map.getView();
  if (options) {
    view.animate({
      ...options,
      center: coordinate,
    });
  } else {
    view.setCenter(coordinate);
  }
};

/**
 * 지도의 줌 레벨을 변경합니다
 * @param map - OpenLayers Map 인스턴스
 * @param zoom - 새로운 줌 레벨
 * @param options - 애니메이션 옵션
 */
export const setMapZoom = (map: Map, zoom: number, options?: Omit<AnimationOptions, 'zoom'>) => {
  const view = map.getView();
  if (options) {
    view.animate({
      ...options,
      zoom: zoom,
    });
  } else {
    view.setZoom(zoom);
  }
};

/**
 * 지도의 모든 레이어를 활성화/비활성화합니다
 * @param map - OpenLayers Map 인스턴스
 * @param visible - 표시 여부
 * @param filter - 레이어 필터링 조건 함수
 */
export const setLayerVisibility = (map: Map, visible: boolean, filter: LayerFilter = AlwaysTrue) => {
  findAllLayer(map, filter).forEach((layer) => layer.setVisible(visible));
};

/**
 * 지도의 현재 상태를 반환합니다
 * @param map - OpenLayers Map 인스턴스
 */
export const getMapState = (map: Map) => {
  const view = map.getView();
  return {
    center: view.getCenter(),
    zoom: view.getZoom(),
    rotation: view.getRotation(),
    extent: view.calculateExtent(map.getSize()),
  };
};

/**
 * 지도의 현재 축척을 반환합니다
 * @param map - OpenLayers Map 인스턴스
 */
export const getMapScale = (map: Map): number => {
  const view = map.getView();
  if (!view) throw new Error('Map view is not available');

  const resolution = view.getResolution();
  if (resolution == null) throw new Error('Unable to get map resolution');

  const units = view.getProjection().getUnits();
  return getScaleForResolution(resolution, units);
};

/**
 * 주어진 해상도와 단위를 기반으로 지도의 축척을 계산합니다.
 * @param resolution - 지도 해상도 값
 * @param units - 지도 단위 ('m', 'degrees' 등)
 * @returns 계산된 축척 값 또는 단위가 지원되지 않는 경우 undefined
 * @example
 * ```ts
 * const scale = getScaleForResolution(10, 'm'); // 미터 단위로 축척 계산
 * const degreeScale = getScaleForResolution(0.001, 'degrees'); // 도 단위로 축척 계산
 * ```
 */
export const getScaleForResolution = (resolution: number | string, units: Units): number => {
  // 입력값 검증
  if (resolution == null) {
    throw new Error('Resolution must be provided');
  }

  // `resolution`이 문자열인 경우 숫자로 변환
  const numericResolution = typeof resolution === 'string' ? parseFloat(resolution) : resolution;

  // 유효하지 않은 resolution 체크
  if (isNaN(numericResolution) || numericResolution <= 0) {
    throw new Error('Invalid resolution value');
  }

  // 단위별 미터 변환 계수 가져오기
  const metersPerUnit = getMetersPerUnit(units);

  // 축척 계산
  // scale = resolution * metersPerUnit * inchesPerMeter * dotsPerInch
  return numericResolution * metersPerUnit * INCHES_PER_METER * DOTS_PER_INCH;
};

export const getResolutionForScale = (scale: number | string, units: Units): number | undefined => {
  // `resolution`이 문자열인 경우 숫자로 변환
  const scaleValue = typeof scale === 'string' ? parseFloat(scale) : scale;

  // 단위별 미터 변환 계수 가져오기
  const metersPerUnit = getMetersPerUnit(units);

  return scaleValue / (metersPerUnit * INCHES_PER_METER * DOTS_PER_INCH);
};

/**
 * 지정된 단위의 미터 변환 계수를 반환합니다.
 * @param units - 변환할 단위
 */
const getMetersPerUnit = (units: Units): number => {
  const metersPerUnit = METERS_PER_UNIT[units as keyof typeof METERS_PER_UNIT];

  if (metersPerUnit == null) {
    throw new Error(`Unsupported units: ${units}`);
  }

  return metersPerUnit;
};
