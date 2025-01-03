import { useView, ViewOptions } from './useView';
import { MapOptions, useMap } from './useMap';

export interface MapViewOptions extends Omit<MapOptions, 'view'> {
  view: ViewOptions;
}

export const useMapView = (options: MapViewOptions) => {
  const view = useView(options.view);
  return useMap({ ...options, view });
};
