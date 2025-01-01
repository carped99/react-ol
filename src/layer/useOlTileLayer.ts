import { useMemo } from 'react';
import { Tile as TileLayer } from 'ol/layer';
import { Tile as TileSource } from 'ol/source';
import { Options } from 'ol/layer/BaseTile';
import { Tile } from 'ol';
import { useOlBaseTileLayer } from '@src/layer/base/useOlBaseTileLayer';

/**
 * {@link TileLayer}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TileLayerOptions<S extends TileSource = TileSource<Tile>> extends Options<S> {}

/**
 * {@link TileLayer}를 생성한다.
 * @param options - {@link TileLayerOptions}
 *
 * @category Layer
 */
export const useOlTileLayer = <S extends TileSource = TileSource<Tile>>(options: Readonly<TileLayerOptions<S>>) => {
  const layer = useMemo(() => {
    console.debug('==> Create TileLayer', options);
    return new TileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOlBaseTileLayer(layer, options);

  return layer;
};
