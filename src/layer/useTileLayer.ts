import { useDebugValue, useMemo } from 'react';
import { Tile as TileLayer } from 'ol/layer';
import { Tile as TileSource } from 'ol/source';
import { Options } from 'ol/layer/BaseTile';
import { Tile } from 'ol';
import { useBaseTileLayer } from './base/useBaseTileLayer';

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
export const useTileLayer = <S extends TileSource = TileSource<Tile>>(options: Readonly<TileLayerOptions<S>>) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new TileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBaseTileLayer(layer, options);

  return layer;
};
