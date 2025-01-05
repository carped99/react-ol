import { useDebugValue, useMemo } from 'react';
import { Tile as TileLayer } from 'ol/layer';
import { Tile as TileSource } from 'ol/source';
import { Tile } from 'ol';
import { useBaseTileLayer } from './base/useBaseTileLayer';
import { TileLayerOptions } from './options';

/**
 * {@link TileLayer}를 생성한다.
 * @param options - {@link TileLayerOptions}
 *
 * @category Layers
 */
export const useTileLayer = <S extends TileSource = TileSource<Tile>>(options: Readonly<TileLayerOptions<S>>) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new TileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBaseTileLayer(layer, options);

  return layer;
};
