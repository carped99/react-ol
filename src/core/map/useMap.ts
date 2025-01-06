import { Ref, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import LayerGroup from 'ol/layer/Group';
import { useProperties } from '../hooks/useProperties';
import { useMapContext } from '../context';
import { usePrevious } from '../hooks/usePrevious';
import { equals, equalsByProps } from '../utils/common';
import { useEvents } from '../events';
import { MapEvents } from './events';
import { MapOptions } from './options';

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link MapOptions} 지도 옵션
 * @param events - Events for the Map.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 * @category Base
 * @public
 * @example
 * ```tsx
 * const MapComponent = () => {
 *  const [targetRef] = useMap();
 *  return <div ref={targetRef} />;
 * };
 * ```
 */
export const useMap = (
  options: Readonly<MapOptions> = {},
  events?: MapEvents,
): [Ref<HTMLDivElement>, Map | undefined] => {
  const { setMap } = useMapContext();

  // 지도를 담을 div 요소
  const divRef = useRef<HTMLDivElement>(null);
  // 지도 객체
  const mapRef = useRef<Map>(undefined);
  // 이전 옵션
  const prevOpts = usePrevious(options);

  if (!mapRef.current && divRef.current) {
    mapRef.current = new Map({
      target: divRef.current,
      ...options,
    });
  }

  useEffect(() => {
    if (!divRef.current) return;

    // 재생성해야만 하는 속성이 변경되었다면, 지도를 새로 생성한다.
    if (!equalsByProps(prevOpts, options, shouldCreateKeys)) {
      cleanupMap(mapRef.current);
      mapRef.current = createMap(divRef.current, options);
      setMap(mapRef.current);
    } else if (mapRef.current && prevOpts !== options) {
      updateMap(mapRef.current, prevOpts, options);
    }
  }, [prevOpts, options, setMap]);

  useProperties(mapRef.current, options);

  // 이벤트를 등록한다.
  useEvents(mapRef.current, events);

  return [divRef, mapRef.current];
};

/**
 * 지도를 생성하고 반환한다.
 * @param div - 지도를 담을 div 요소
 * @param options - {@link MapOptions} 지도 옵션
 */
const createMap = (div: HTMLElement, options?: MapOptions) => {
  console.log('createMap', div, options);
  return new Map({
    target: div,
    ...options,
  });
};

/**
 * 지도를 정리한다.
 * @param map - 지도 객체
 */
const cleanupMap = (map: Map | undefined) => {
  map?.setTarget(undefined);
  map?.dispose();
};

/**
 * 지도를 수정한다.
 * @param map - 지도 객체
 * @param prev - 이전 옵션
 * @param curr - 현재 옵션
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
  map.setView(curr?.view ?? new View());
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

  if (curr?.controls != null) {
    curr.controls.forEach(map.addControl);
  }
};

const updateInteractions = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (equals(prev?.interactions, curr?.interactions)) return;

  if (curr?.interactions != null) {
    curr.interactions.forEach(map.addInteraction);
  }
};

const updateOverlays = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (equals(prev?.overlays, curr?.overlays)) return;
  if (curr?.overlays != null) {
    curr.overlays.forEach(map.addOverlay);
  }
};

const shouldCreateKeys = ['keyboardEventTarget', 'maxTilesLoading', 'moveTolerance', 'pixelRatio'] as const;
