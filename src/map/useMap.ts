import { Ref, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { MapOptions as OLMapOptions } from 'ol/Map';
import LayerGroup from 'ol/layer/Group';
import { BaseObjectOptions, useBaseObject } from '../hooks/useBaseObject';
import { MapEvents } from '.';
import { useMapContext } from '../context';
import { usePrevious } from '../hooks/usePrevious';
import { compareOptIn } from '../utils/common';
import { useEvents } from '../events';

/**
 * 지도 옵션
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 */
export interface MapOptions extends Omit<OLMapOptions, 'target'> {
  properties?: BaseObjectOptions['properties'];
}

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link MapOptions} 지도 옵션
 * @param observable - Observable for the interaction.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
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
  observable?: MapEvents<Map>,
): [Ref<HTMLDivElement>, Map | undefined] => {
  const { setMap } = useMapContext();

  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(undefined);

  if (!mapRef.current && divRef.current) {
    mapRef.current = new Map({
      target: divRef.current,
      ...options,
    });
  }

  const prevOpts = usePrevious(options);

  useEffect(() => {
    console.log('useMap useEffect', mapRef.current, divRef.current);
    if (!divRef.current) return;

    if (mapRef.current && compareOptIn(prevOpts, options, mutationKeys)) {
      updateMap(mapRef.current, prevOpts, options);
    } else {
      cleanupMap(mapRef.current);
      mapRef.current = createMap(divRef.current, options);
      setMap(mapRef.current);
    }
  }, [prevOpts, options, setMap]);

  useBaseObject(mapRef.current, options);
  useEvents(mapRef.current, observable);

  return [divRef, mapRef.current];
};

const createMap = (div: HTMLElement, options?: MapOptions) => {
  console.log('createMap', div, options);
  return new Map({
    target: div,
    ...options,
  });
};

const cleanupMap = (map: Map | undefined) => {
  map?.setTarget(undefined);
  map?.dispose();
};

const updateMap = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  updateView(map, prev, curr);
  updateLayers(map, prev, curr);
  updateControls(map, prev, curr);
  updateInteractions(map, prev, curr);
  updateOverlays(map, prev, curr);
};

const updateView = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (prev?.view !== curr?.view) {
    map.setView(curr?.view ?? new View());
  }
};

const updateLayers = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (prev?.layers !== curr?.layers && curr?.layers != null) {
    if (curr.layers instanceof LayerGroup) {
      map.setLayerGroup(curr.layers);
    } else {
      map.setLayers(curr.layers);
    }
  }
};

const updateControls = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (prev?.controls !== curr?.controls && curr?.controls != null) {
    curr.controls.forEach(map.addControl);
  }
};

const updateInteractions = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (prev?.interactions !== curr?.interactions && curr?.interactions != null) {
    curr.interactions.forEach(map.addInteraction);
  }
};

const updateOverlays = (map: Map, prev?: MapOptions, curr?: MapOptions) => {
  if (prev?.overlays !== curr?.overlays && curr?.overlays != null) {
    curr.overlays.forEach(map.addOverlay);
  }
};

const mutationKeys: readonly (keyof MapOptions)[] = [
  'keyboardEventTarget',
  'maxTilesLoading',
  'moveTolerance',
  'pixelRatio',
];
