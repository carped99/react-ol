import { OSM, Tile as TileSource } from 'ol/source';
import { Options as OMSOptions } from 'ol/source/OSM';
import { Options } from 'ol/layer/BaseTile';
import { useTileLayer } from '@src/hooks/layer/useTileLayer';
import { useMemo } from 'react';

export type OSMLayerOptions = Omit<Options<TileSource>, 'source'> & {
  source?: OMSOptions;
};

/**
 * {@link https://www.openstreetmap.org/ OSM} {@link TileLayer}를 생성한다.
 * @param options {@link OSMLayerOptions}
 */
export const useOSMLayer = (options?: Readonly<OSMLayerOptions>) => {
  const source = useMemo(() => {
    return new OSM(options?.source);
  }, [options?.source]);

  return useTileLayer({
    ...options,
    source,
  });
};
