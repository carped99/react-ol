import { useEffect } from 'react';
import { MapOptions } from 'ol/Map';
import { ViewOptions } from 'ol/View';
import { useMapDispatch } from '@src/context/MapContext';
import { useView } from '@src/hooks/map/useView';
import { MapEventHandlers, useMap } from '@src/hooks/map/useMap';

export interface MapViewOptions extends Omit<MapOptions, 'view'>, MapEventHandlers {
  view: ViewOptions;
}

export const useMapView = (options: MapViewOptions) => {
  const mapDispatch = useMapDispatch();

  const view = useView(options.view);
  const { mapRef, mapInstance } = useMap(view);

  useEffect(() => {
    mapDispatch.setMap(mapInstance);
    return () => {
      mapDispatch.setMap(undefined);
    };
  }, [mapInstance, mapDispatch]);

  return mapRef;
};
