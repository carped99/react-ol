import { Ref, useCallback, useEffect, useRef } from 'react';
import { Map } from 'ol';
import { MapOptions } from 'ol/Map';
import { useOlMapDispatch } from '@src/context';
import { getLogger } from '@src/utils/logger';
import { OlMapEvents } from '@src/observable/options/OlMapEvents';
import { useOlObservable } from '@src/observable/useOlObservable';

/**
 * 지도 옵션
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlMapOptions extends MapOptions {}

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link OlMapOptions} 지도 옵션
 * @param observable - Observable for the interaction.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 *
 * @public
 * @example
 * ```tsx
 * const MapComponent = () => {
 *  const targetRef = useOlMap();
 *  return <div ref={targetRef} />;
 * };
 * ```
 */
export const useOlMap = (options?: Readonly<OlMapOptions>, observable?: OlMapEvents<Map>): Ref<HTMLDivElement> => {
  getLogger('Map').trace(() => 'useMap', options);

  const targetRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(undefined);

  const mapDispatch = useOlMapDispatch();
  // const [map, setMap] = useState<Map | undefined>(undefined);
  const layersRef = useRef(options?.layers);
  const controlsRef = useRef(options?.controls);
  const interactionsRef = useRef(options?.interactions);
  const viewRef = useRef(options?.view);

  const createMap = useCallback(
    (target: HTMLDivElement) => {
      return new Map({
        target,
        view: viewRef.current,
        layers: layersRef.current,
        controls: controlsRef.current,
        interactions: interactionsRef.current,
        ...options,
      });
    },
    [options],
  );

  const cleanupMap = useCallback(() => {
    if (!mapRef.current) return;

    mapRef.current.setTarget(undefined);
    mapRef.current.dispose();
    mapRef.current = undefined;
  }, []);

  useEffect(() => {
    if (!targetRef.current) return;

    mapRef.current = createMap(targetRef.current);

    return () => {
      cleanupMap();
      mapDispatch.setMap(undefined);
    };
  }, [cleanupMap, createMap, mapDispatch, options]);

  useOlObservable(mapRef.current, observable);

  // useEffect(() => {
  //   console.log('1. ==================== useMap =================', targetRef.current);
  //   if (!targetRef.current) return;
  //
  //   console.log('2. ==================== useMap =================', targetRef.current);
  //
  //   const map = new Map({
  //     target: targetRef.current,
  //     view: viewRef.current,
  //     layers: layersRef.current,
  //     controls: controlsRef.current,
  //     interactions: interactionsRef.current,
  //     ...options,
  //   });
  //
  //   setMapInstance(map);
  //   mapDispatch.setMap(mapInstance);
  //
  //   return () => {
  //     mapDispatch.setMap(undefined);
  //     setMapInstance(undefined);
  //
  //     map.setTarget(undefined);
  //     map.dispose();
  //   };
  // }, [mapDispatch, options?.keyboardEventTarget, options?.pixelRatio]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (viewRef.current != options?.view) {
      if (options?.view) {
        console.log('==> setView', options.view);
        mapRef.current.setView(options.view);
      }
    }
  }, [options?.view]);

  return targetRef;

  // return useCallback(
  //   (target: HTMLDivElement) => {
  //     if (target) {
  //       mapRef.current = createMap(target);
  //       mapDispatch.setMap(mapRef.current);
  //       // map?.setTarget(target);
  //     }
  //
  //     return () => {
  //       cleanupMap();
  //     };
  //   },
  //   [cleanupMap, createMap, mapDispatch],
  // );
};
