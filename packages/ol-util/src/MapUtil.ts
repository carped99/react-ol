import { Feature, getUid } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Extent, isEmpty } from 'ol/extent';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import Map from 'ol/Map';
import { AnimationOptions, FitOptions } from 'ol/View';
import { Features, Predicate } from './common';
import { getFeatureExtent } from './FeatureUtil';
import { METERS_PER_UNIT, Units } from 'ol/proj/Units';

// 상수 정의
const INCHES_PER_METER = 39.37;
const DOTS_PER_INCH = 25.4 / 0.28;

/**
 * 지도에서 조건에 맞는 모든 레이어를 찾아 반환합니다.
 * @param source - OpenLayers Map 또는 LayerGroup 인스턴스
 * @param filter - 레이어 필터링 조건 함수
 * @returns 조건에 맞는 레이어 배열
 */
export const findAllLayer = (source: Map | LayerGroup, filter: Predicate<BaseLayer> = () => true): BaseLayer[] => {
  return source
    .getLayers()
    .getArray()
    .flatMap((layer) => {
      if (layer instanceof LayerGroup) {
        return findAllLayer(layer, filter); // 재귀적으로 하위 레이어 탐색
      }
      return filter(layer) ? [layer] : []; // 조건에 맞으면 추가
    });
};

/**
 * 지도에서 조건에 맞는 첫 번째 레이어를 찾아 반환합니다.
 * @param source - OpenLayers Map 또는 LayerGroup 인스턴스
 * @param filter - 레이어 필터링 조건 함수
 * @returns 조건에 맞는 첫 번째 레이어 또는 null
 */
export const findLayer = (source: Map | LayerGroup, filter: Predicate<BaseLayer> = () => true): BaseLayer | null => {
  for (const layer of source.getLayers().getArray()) {
    if (filter(layer)) return layer; // 조건에 맞는 레이어 반환
    if (layer instanceof LayerGroup) {
      const found = findLayer(layer, filter); // 재귀적으로 하위 레이어 탐색
      if (found) return found; // 조건에 맞는 레이어 발견 시 반환
    }
  }
  return null; // 조건에 맞는 레이어가 없으면 null 반환
};

/**
 * 지도에서 지정된 이름을 가진 모든 레이어를 찾아 반환합니다.
 * @param source - OpenLayers Map 또는 LayerGroup 인스턴스
 * @param name - 찾을 레이어 이름
 * @returns 이름이 일치하는 레이어 배열
 */
export const findAllLayerByName = (source: Map | LayerGroup, name: string) => {
  return findAllLayerByProperty(source, 'name', name);
};

/**
 * 지도에서 지정된 속성값을 가진 모든 레이어를 찾아 반환합니다.
 * @param source - OpenLayers Map 또는 LayerGroup 인스턴스
 * @param key - 속성 키
 * @param value - 속성값
 * @returns 속성값이 일치하는 레이어 배열
 */
export const findAllLayerByProperty = (source: Map | LayerGroup, key: string, value: unknown) => {
  return findAllLayer(source, (layer) => layer.get(key) === value);
};

/**
 * 지도에서 지정된 이름을 가진 첫 번째 레이어를 찾아 반환합니다.
 * @param source - OpenLayers Map 또는 LayerGroup 인스턴스
 * @param name - 찾을 레이어 이름
 * @returns 이름이 일치하는 첫 번째 레이어 또는 null
 */
export const findLayerByName = (source: Map | LayerGroup, name: string) => {
  return findLayerByProperty(source, 'name', name);
};

/**
 * 지도에서 지정된 속성값을 가진 첫 번째 레이어를 찾아 반환합니다.
 * @param source - OpenLayers Map 또는 LayerGroup 인스턴스
 * @param key - 속성 키
 * @param value - 속성값
 * @returns 속성값이 일치하는 첫 번째 레이어 또는 null
 */
export const findLayerByProperty = (source: Map | LayerGroup, key: string, value: unknown) => {
  return findLayer(source, (layer) => layer.get(key) === value);
};

/**
 * 지도에서 지정된 UID를 가진 레이어를 찾아 반환합니다.
 * @param source - OpenLayers Map 또는 LayerGroup 인스턴스
 * @param uid - 찾을 레이어의 UID
 * @returns UID가 일치하는 레이어 또는 null
 */
export const findLayerByUid = (source: Map | LayerGroup, uid: ReturnType<typeof getUid>) => {
  return findLayer(source, (layer) => uid === getUid(layer));
};

/**
 * 지도의 특정 레이어 그룹을 찾아 반환합니다
 * @param map - OpenLayers Map 인스턴스
 * @param groupName - 레이어 그룹 이름
 */
export const findLayerGroup = (map: Map, groupName: string): LayerGroup | null => {
  return findLayer(map, (layer) => layer instanceof LayerGroup && layer.get('name') === groupName) as LayerGroup | null;
};

/**
 * 지도에서 특정 Feature를 포함하는 레이어를 찾습니다
 * @param map - OpenLayers Map 인스턴스
 * @param feature - 찾을 Feature
 */
export const findLayerByFeature = (map: Map, feature: Feature): BaseLayer | null => {
  return findLayer(map, (layer) => {
    const source = (layer as any).getSource?.();
    return source?.getFeatures?.()?.includes(feature) ?? false;
  });
};

/**
 * 지정된 Feature가 지도에 완전히 보이도록 뷰를 조정합니다.
 * @param map - OpenLayers Map 인스턴스
 * @param feature - 표시할 Feature 또는 Feature 배열
 * @param options - fit 옵션
 */
export const fitToFeature = (map: Map, feature: Features, options?: FitOptions) => {
  const extent = getFeatureExtent(feature);
  fitToExtent(map, extent, options);
};

/**
 * 지정된 영역이 지도에 완전히 보이도록 뷰를 조정합니다
 * @param map - OpenLayers Map 인스턴스
 * @param extent - 표시할 영역
 * @param options - fit 옵션
 */
export const fitToExtent = (map: Map, extent: Extent, options?: FitOptions) => {
  if (!isEmpty(extent)) {
    map.getView().fit(extent, options);
  }
};

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
export const setLayerVisibility = (map: Map, visible: boolean, filter: Predicate<BaseLayer> = () => true) => {
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
