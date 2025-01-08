import { OSM } from 'ol/source';
import { useDebugValue, useMemo } from 'react';
import { useTileLayer } from './useTileLayer';
import { OSMLayerOptions } from './options';

/**
 * {@link https://www.openstreetmap.org/ OSM} {@link TileLayer}를 생성한다.
 * @param options - {@link OSMLayerOptions}
 *
 * @category Layers
 */
export const useOSMLayer = (options?: Readonly<OSMLayerOptions>) => {
  useDebugValue(options);

  const source = useMemo(() => {
    return new OSM(options?.source);
  }, [options?.source]);

  return useTileLayer({
    ...options,
    source,
  });
};
