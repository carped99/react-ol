import LayerGroup from 'ol/layer/Group.js';
import Map, { MapOptions as OLMapOptions } from 'ol/Map.js';
import View from 'ol/View.js';
import { Ref, useCallback, useEffect, useRef } from 'react';
import { usePrevious } from '../base';
import { BaseObjectOptions, useProperties } from '../base/useProperties';
import { useMapContext } from '../context';
import { useEvents } from '../events';
import { equals, equalsByProps } from '../utils';
import { MapEvents } from './events';

export interface MapOptions extends Omit<OLMapOptions, 'target'> {
  properties?: BaseObjectOptions['properties'];
}

/**
 * 지도를 생성하고 관리하는 React Hook입니다.
 *
 * @param options - 지도 생성 옵션
 * @param events - 지도 이벤트 핸들러
 * @returns [HTMLDivElement에 대한 ref, 생성된 Map 인스턴스]
 *
 * @example
 * ```tsx
 * const MapComponent = () => {
 *   const [targetRef, map] = useMap({
 *     view: new View({
 *       center: [0, 0],
 *       zoom: 2
 *     })
 *   });
 *
 *   return <div ref={targetRef} style={{ width: '100%', height: '400px' }} />;
 * };
 * ```
 */
export const useMap = (options: Readonly<MapOptions> = {}, events?: MapEvents): Ref<HTMLDivElement> => {
  const { setMap } = useMapContext();

  // 지도 div
  const divRef = useRef<HTMLDivElement>(null);
  // 지도 객체
  const mapRef = useRef<Map>(undefined);
  // 이전 옵션
  const prevOpts = usePrevious(options);

  // cleanup 함수
  const cleanup = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.setTarget(undefined);
      mapRef.current.dispose();
      mapRef.current = undefined;
      setMap(undefined);
    }
  }, [setMap]);

  // if (!mapRef.current && divRef.current) {
  //   mapRef.current = new Map({
  //     target: divRef.current,
  //     ...options,
  //   });
  // }

  useEffect(() => {
    if (!divRef.current) {
      cleanup();
      return;
    }

    // 재생성해야만 하는 속성이 변경되었다면, 지도를 새로 생성한다.
    if (!mapRef.current || !equalsByProps(prevOpts, options, shouldCreateKeys)) {
      cleanup();
      mapRef.current = createMap(divRef.current, options);
      setMap(mapRef.current);
    } else if (mapRef.current && prevOpts !== options) {
      updateMap(mapRef.current, prevOpts, options);
    }
  }, [prevOpts, options, setMap, cleanup]);

  // 속성 및 이벤트 설정
  useProperties(mapRef.current, options);
  useEvents(mapRef.current, events);

  // cleanup on unmount
  useEffect(() => cleanup, [cleanup]);

  return divRef;
};

/**
 * OpenLayers Map 인스턴스를 생성합니다.
 *
 * @param div - 지도를 렌더링할 HTML 요소
 * @param options - 지도 생성 옵션
 * @returns 생성된 Map 인스턴스
 *
 * @internal
 */
const createMap = (div: HTMLElement, options?: MapOptions) => {
  console.log('createMap', div, options);
  return new Map({
    target: div,
    ...options,
  });
};

/**
 * Map 인스턴스의 설정을 업데이트합니다.
 *
 * @param map - 업데이트할 Map 인스턴스
 * @param prev - 이전 옵션
 * @param curr - 새로운 옵션
 *
 * @internal
 */
const updateMap = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  updateView(map, prev, curr);
  updateLayers(map, prev, curr);
  updateControls(map, prev, curr);
  updateInteractions(map, prev, curr);
  updateOverlays(map, prev, curr);
};

const updateView = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (equals(prev?.view, curr?.view)) return;

  const oldView = map.getView();
  const newView = curr?.view ?? new View();

  // View가 Promise가 아닌 경우에만 상태를 복사
  if (oldView && !curr?.view && newView instanceof View) {
    const center = oldView.getCenter();
    const zoom = oldView.getZoom();
    const rotation = oldView.getRotation();
    const projection = oldView.getProjection();

    if (center) newView.setCenter(center);
    if (zoom != null) newView.setZoom(zoom);
    if (rotation != null) newView.setRotation(rotation);
    if (projection) newView.set('projection', projection);
  }

  map.setView(newView);
};

const updateLayers = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (equals(prev?.layers, curr?.layers)) return;
  if (curr?.layers != null) {
    if (curr.layers instanceof LayerGroup) {
      map.setLayerGroup(curr.layers);
    } else {
      map.setLayers(curr.layers);
    }
  }
};

const updateControls = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (equals(prev?.controls, curr?.controls)) return;

  // 기존 컨트롤 제거
  map.getControls().clear();

  // 새 컨트롤 추가
  if (curr?.controls != null) {
    curr.controls.forEach((control) => map.addControl(control));
  }
};

const updateInteractions = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (equals(prev?.interactions, curr?.interactions)) return;

  // 기존 인터랙션 제거
  map.getInteractions().clear();

  if (curr?.interactions != null) {
    curr.interactions.forEach((interaction) => map.addInteraction(interaction));
  }
};

const updateOverlays = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (equals(prev?.overlays, curr?.overlays)) return;

  // 기존 오버레이 제거
  map.getOverlays().clear();

  if (curr?.overlays != null) {
    curr.overlays.forEach((overlay) => map.addOverlay(overlay));
  }
};

const shouldCreateKeys = ['keyboardEventTarget', 'maxTilesLoading', 'moveTolerance', 'pixelRatio'] as const;
