import { useEffect, useRef, useState } from 'react';
import Map, { MapOptions } from 'ol/Map';
import View, { ViewOptions } from 'ol/View';
import { MapBrowserEvent, MapEvent } from 'ol';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import { useEventHandler } from '@src/hooks/map/useEventHandler';

export interface MapEventHandlers {
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
}

export interface MapViewOptions extends Omit<MapOptions, 'view'>, MapEventHandlers {
  view: ViewOptions;
}

export const useMap = (view: View, options?: Omit<MapOptions, 'view'>) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<Map>();
  const layersRef = useRef(options?.layers);
  const controlsRef = useRef(options?.controls);
  const interactionsRef = useRef(options?.interactions);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      view,
      layers: layersRef.current,
      controls: controlsRef.current,
      interactions: interactionsRef.current,
      ...options,
    });

    setMapInstance(map);

    return () => {
      map.setTarget(undefined);
      map.dispose();
      setMapInstance(undefined);
    };
  }, [options?.keyboardEventTarget, options?.pixelRatio]);

  useEffect(() => {
    if (!mapInstance) return;

    if (mapInstance.getView() === view) return;

    mapInstance.setView(view);
  }, [mapInstance, view]);

  useEventHandler(mapInstance, options);

  return { mapRef, mapInstance };
};
