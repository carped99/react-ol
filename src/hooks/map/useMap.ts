import { Ref, useCallback, useEffect, useRef } from 'react';
import { MapOptions as OLMapOptions } from 'ol/Map';
import { Map } from 'ol';
import { useMapDispatch } from '@src/context/MapContext';
import { getLogger } from '@src/utils/logger';
import { MapEvents } from '@src/hooks/event/MapEvents';

export interface MapOptions extends OLMapOptions, MapEvents {}

export const useMap = (options?: Readonly<MapOptions>): Ref<HTMLDivElement> => {
  getLogger('Map').trace(() => 'useMap', options);

  // const targetRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(undefined);

  const mapDispatch = useMapDispatch();
  // const [map, setMap] = useState<Map | undefined>(undefined);
  const layersRef = useRef(options?.layers);
  const controlsRef = useRef(options?.controls);
  const interactionsRef = useRef(options?.interactions);
  const viewRef = useRef(options?.view);

  const createMap = useCallback(
    (target: HTMLDivElement) => {
      getLogger('Map').info(() => 'createMap', target);
      const map = new Map({
        target,
        view: viewRef.current,
        layers: layersRef.current,
        controls: controlsRef.current,
        interactions: interactionsRef.current,
        ...options,
      });

      return map;
    },
    [options],
  );

  const cleanup = useCallback(() => {
    getLogger('Map').info(() => 'cleanup', mapRef.current);
    if (mapRef.current) {
      mapDispatch.setMap(undefined);
      mapRef.current.setTarget(undefined);
      mapRef.current.dispose();
      mapRef.current = undefined;
    }
  }, []);

  // useEffect(() => {
  //   if (!targetRef.current) return;
  //
  //   if (!map) {
  //     setMap(createMap(targetRef.current));
  //   }
  //
  //   return () => {
  //     if (map) {
  //       mapDispatch.setMap(undefined);
  //       map.setTarget(undefined);
  //       map.dispose();
  //       setMap(undefined);
  //     }
  //   };
  // }, []);

  // useEventHandler(mapRef.current, options);

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

  return useCallback((target: HTMLDivElement) => {
    if (target) {
      mapRef.current = createMap(target);
      mapDispatch.setMap(mapRef.current);
      // map?.setTarget(target);
    }

    return () => {
      cleanup();
    };
  }, []);
};
