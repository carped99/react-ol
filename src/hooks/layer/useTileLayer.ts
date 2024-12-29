import { useMemo } from 'react';
import { Tile as TileLayer } from 'ol/layer';
import { Tile as TileSource } from 'ol/source';
import { Options } from 'ol/layer/BaseTile';
import { useBaseTileLayer } from '@src/hooks/layer/base/useBaseTileLayer';
import { Tile } from 'ol';

export type TileLayerOptions<S extends TileSource = TileSource<Tile>> = Options<S> & {};

/**
 * {@link TileLayer}를 생성한다.
 * @param options {@link TileLayerOptions}
 */
export const useTileLayer = <S extends TileSource = TileSource<Tile>>(options: TileLayerOptions<S>) => {
  const layer = useMemo(() => {
    return new TileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBaseTileLayer(layer, options);

  return layer;
};
