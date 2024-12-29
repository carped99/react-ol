import { OSM, Tile as TileSource } from 'ol/source';
import { Options as OMSOptions } from 'ol/source/OSM';
import { Options } from 'ol/layer/BaseTile';
import { useTileLayer } from '@src/hooks/layer/useTileLayer';
import { useMemo } from 'react';

export type OSMLayerOptions = Omit<Options<TileSource>, 'source'> & {
  source?: OMSOptions;
};

/**
 * OSM {@link TileLayer}를 생성한다.
 * @param options {@link OSMLayerOptions}
 */
export const useOSMLayer = (options?: OSMLayerOptions) => {
  const osmSource = useMemo(() => {
    return new OSM(options?.source);
  }, [options?.source]);

  return useTileLayer({
    ...options,
    source: osmSource,
  });
};
