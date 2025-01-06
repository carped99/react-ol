import { useCallback, useDebugValue } from 'react';
import { Tile as TileLayer } from 'ol/layer';
import { Tile as TileSource } from 'ol/source';
import { Tile } from 'ol';
import { TileLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { useBaseTileLayer } from './base/useBaseTileLayer';

/**
 * {@link TileLayer}를 생성한다.
 * @param options - {@link TileLayerOptions}
 *
 * @category Layers
 */
export const useTileLayer = <S extends TileSource = TileSource<Tile>>(options: Readonly<TileLayerOptions<S>>) => {
  useDebugValue(options);

  const provider = useBaseObjectProvider<TileLayer<S>, TileLayerOptions<S>>(
    useCallback((options) => new TileLayer<S>(options), []),
  );

  const instance = useInstance(provider, options);

  useBaseTileLayer(instance, options);

  return instance;
};
