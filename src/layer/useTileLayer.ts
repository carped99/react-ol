import { useMemo } from 'react';
import { Tile as TileLayer } from 'ol/layer';
import { Tile as TileSource } from 'ol/source';
import { Options } from 'ol/layer/BaseTile';
import { Tile } from 'ol';
import { useBaseTileLayer } from '@src/layer/base/useBaseTileLayer';

export type TileLayerOptions<S extends TileSource = TileSource<Tile>> = Options<S> & {};

/**
 * {@link TileLayer}를 생성한다.
 * @param options {@link TileLayerOptions}
 */
export const useTileLayer = <S extends TileSource = TileSource<Tile>>(options: Readonly<TileLayerOptions<S>>) => {
  const layer = useMemo(() => {
    console.debug('==> Create TileLayer', options);
    return new TileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBaseTileLayer(layer, options);

  return layer;
};
