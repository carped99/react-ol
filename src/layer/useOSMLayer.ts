import { OSM, Tile as TileSource } from 'ol/source';
import { Options as OMSOptions } from 'ol/source/OSM';
import { Options } from 'ol/layer/BaseTile';
import { useDebugValue, useMemo } from 'react';
import { useTileLayer } from './useTileLayer';

/**
 * {@link OSM} {@link TileLayer}의 옵션
 *
 * @category Layer Option
 */
export interface OSMLayerOptions extends Omit<Options<TileSource>, 'source'> {
  source?: OMSOptions;
}

/**
 * {@link https://www.openstreetmap.org/ OSM} {@link TileLayer}를 생성한다.
 * @param options - {@link OSMLayerOptions}
 *
 * @category Layer
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
