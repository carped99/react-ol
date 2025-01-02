import { Ref, useCallback, useEffect, useRef } from 'react';
import { Map } from 'ol';
import { MapOptions } from 'ol/Map';
import { getLogger } from '@src/utils/logger';
import { OlMapEvents } from '@src/observable/options/OlMapEvents';
import { useOlObservable } from '@src/observable/useOlObservable';
import { useOlMapContext } from '@src/context';
import { OlBaseObjectOptions, useOlBaseObject } from '@src/hooks/useOlBaseObject';

/**
 * 지도 옵션
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 */
export interface OlMapOptions extends MapOptions {
  properties?: OlBaseObjectOptions['properties'];
}

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link OlMapOptions} 지도 옵션
 * @param observable - Observable for the interaction.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 * @category Base
 * @public
 * @example
 * ```tsx
 * const MapComponent = () => {
 *  const [targetRef] = useOlMap();
 *  return <div ref={targetRef} />;
 * };
 * ```
 */
export const useOlMap = (
  options?: Readonly<OlMapOptions>,
  observable?: OlMapEvents<Map>,
): [Ref<HTMLDivElement>, Map | undefined] => {
  getLogger('Map').trace(() => 'useMap', options);

  const { setMap } = useOlMapContext();

  // 지도를 생성할 타겟
  const divRef = useRef<HTMLDivElement>(null);

  // 지도 인스턴스
  const mapRef = useRef<Map>(undefined);

  const layersRef = useRef(options?.layers);
  const controlsRef = useRef(options?.controls);
  const interactionsRef = useRef(options?.interactions);
  const viewRef = useRef(options?.view);

  // 지도 생성 함수
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

  // 지도 정리 함수
  const cleanupMap = useCallback(() => {
    if (!mapRef.current) return;

    mapRef.current.setTarget(undefined);
    mapRef.current.dispose();
    mapRef.current = undefined;
  }, []);

  useEffect(() => {
    if (!divRef.current) return;

    mapRef.current = createMap(divRef.current);
    setMap(mapRef.current);

    return () => {
      setMap(undefined);
      cleanupMap();
    };
  }, [cleanupMap, createMap, setMap, options]);

  useOlBaseObject(mapRef.current, options);
  useOlObservable(mapRef.current, observable);

  useEffect(() => {
    if (!mapRef.current) return;

    if (viewRef.current != options?.view) {
      if (options?.view) {
        console.log('==> setView', options.view);
        mapRef.current.setView(options.view);
      }
    }
  }, [options?.view]);

  return [divRef, mapRef.current];

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
