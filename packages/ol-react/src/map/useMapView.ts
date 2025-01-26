import { MapViewOptions } from './options';
import { useMap, useView } from '.';

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link MapOptions} 지도 옵션
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 * @category Base
 * @public
 */
export const useMapView = (options: MapViewOptions) => {
  const view = useView(options.view);
  return useMap({ ...options, view });
};
