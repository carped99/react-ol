import { Map } from 'ol';
import * as basic from './basic';
import { Features } from '../common';
import { AnimationOptions, FitOptions } from 'ol/View';
import { Extent } from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
import { Units } from 'ol/proj/Units';
import {
  getMapScale,
  getMapState,
  getResolutionForScale,
  getScaleForResolution,
  setLayerVisibility,
  setMapCenter,
  setMapZoom,
} from './MapUtil';
import { LayerFilter } from '../Filter/predicate';

/**
 * 맵 조작을 위한 유틸리티 인터페이스
 */
interface MapUtilApi {
  /**
   * 지정된 Feature가 지도에 완전히 보이도록 뷰를 조정합니다.
   * @param map - OpenLayers Map 인스턴스
   * @param feature - 표시할 Feature 또는 Feature 배열
   * @param options - fit 옵션
   */
  fitToFeature(map: Map, feature: Features, options?: FitOptions): void;

  /**
   * 지정된 영역이 지도에 완전히 보이도록 뷰를 조정합니다
   * @param map - OpenLayers Map 인스턴스
   * @param extent - 표시할 영역
   * @param options - fit 옵션
   */
  fitToExtent(map: Map, extent: Extent, options?: FitOptions): void;

  /**
   * 지도의 중심점을 변경합니다.
   * @param map - OpenLayers Map 인스턴스
   * @param coordinate - 새로운 중심 좌표
   * @param options - 애니메이션 옵션
   */
  setMapCenter(map: Map, coordinate: Coordinate, options?: Omit<AnimationOptions, 'center'>): void;

  /**
   * 지도의 줌 레벨을 변경합니다
   * @param map - OpenLayers Map 인스턴스
   * @param zoom - 새로운 줌 레벨
   * @param options - 애니메이션 옵션
   */
  setMapZoom(map: Map, zoom: number, options?: Omit<AnimationOptions, 'zoom'>): void;

  /**
   * 지도의 모든 레이어를 활성화/비활성화합니다
   * @param map - OpenLayers Map 인스턴스
   * @param visible - 표시 여부
   * @param filter - 레이어 필터링 조건 함수
   */
  setLayerVisibility(map: Map, visible: boolean, filter: LayerFilter): void;

  /**
   * 지도의 현재 상태를 반환합니다
   * @param map - OpenLayers Map 인스턴스
   */
  getMapState(map: Map): void;

  /**
   * 지도의 현재 축척을 반환합니다
   * @param map - OpenLayers Map 인스턴스
   */
  getMapScale(map: Map): number;

  /**
   * 주어진 해상도와 단위를 기반으로 지도의 축척을 계산합니다.
   * @param resolution - 지도 해상도 값
   * @param units - 지도 단위 ('m', 'degrees' 등)
   * @returns 계산된 축척 값 또는 단위가 지원되지 않는 경우 undefined
   * @example
   * ```ts
   * const scalegetScaleForResolution(10, 'm'); // 미터 단위로 축척 계산
   * const degreeScalegetScaleForResolution(0.001, 'degrees'); // 도 단위로 축척 계산
   * ```
   */
  getScaleForResolution(resolution: number | string, units: Units): number;

  getResolutionForScale(scale: number | string, units: Units): number | undefined;
}

export const MapUtil: MapUtilApi & typeof basic = {
  ...basic,
  setMapCenter,
  setMapZoom,
  setLayerVisibility,
  getMapState,
  getMapScale,
  getScaleForResolution,
  getResolutionForScale,
};
