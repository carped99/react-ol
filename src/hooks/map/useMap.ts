import { Ref, useCallback, useEffect, useRef } from 'react';
import { MapOptions as OLMapOptions } from 'ol/Map';
import { Map, MapBrowserEvent, MapEvent } from 'ol';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import { useMapDispatch } from '@src/context/MapContext';
import { ObjectEvent } from 'ol/Object';

interface MapEventHandlers {
  onClick?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;
  onSingleClick?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;
  onDblClick?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;
  onMoveStart?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;
  onMoveEnd?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;
  onPointerDrag?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;
  onPointerMove?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;
  onPostRender?: (this: Map, e: MapEvent) => boolean | void;
  onPreCompose?: (this: Map, e: RenderEvent) => boolean | void;
  onPostCompose?: (this: Map, e: RenderEvent) => boolean | void;
  onRenderComplete?: (this: Map, e: RenderEvent) => boolean | void;
  onChange?: (this: Map, e: BaseEvent) => void;
  onChangeLayerGroup?: (this: Map, e: ObjectEvent) => void;
  onChangeSize?: (this: Map, e: ObjectEvent) => void;
  onChangeTarget?: (this: Map, e: ObjectEvent) => void;
  onChangeView?: (this: Map, e: ObjectEvent) => void;
}

export interface MapOptions extends OLMapOptions, MapEventHandlers {}

export const useMap = (options?: MapOptions): Ref<HTMLDivElement> => {
  console.log('==================== useMap =================', options);

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
      console.log('==> createMap', target, viewRef.current);
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
      mapDispatch.setMap(undefined);
      mapRef.current?.setTarget(undefined);
      mapRef.current?.dispose();
      mapRef.current = undefined;
      // setMap(undefined);
      console.log('==> useMap useCallback cleanup', target);
    };
  }, []);
};
