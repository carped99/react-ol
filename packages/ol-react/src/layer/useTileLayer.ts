import { Options } from 'ol/layer/BaseTile.js';
import TileLayer from 'ol/layer/Tile.js';
import TileSource from 'ol/source/Tile.js';
import Tile from 'ol/Tile.js';
import { useCallback, useDebugValue } from 'react';
import { useInstance, useInstanceProviderByKeys } from '../base';
import { useEvents } from '../events';
import { BaseTileLayerInstanceProperties } from './base/LayerProperties';
import { useBaseTileLayer } from './base/useBaseTileLayer';
import { TileLayerEvents } from './events/TileLayerEvents';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TileLayerOptions<S extends TileSource = TileSource<Tile>> extends Options<S> {}

/**
 * {@link TileLayer}를 생성한다.
 * @param options - {@link TileLayerOptions}
 * @param events - {@link TileLayerEvents}
 *
 * @category Layers
 */
export const useTileLayer = <S extends TileSource = TileSource<Tile>>(
  options: Readonly<TileLayerOptions<S>>,
  events?: TileLayerEvents,
) => {
  useDebugValue(options);

  const instanceProvider = useInstanceProviderByKeys<TileLayer<S>, TileLayerOptions<S>>(
    useCallback((options) => new TileLayer<S>(options), []),
    instanceProperties,
  );

  const instance = useInstance(instanceProvider, options);

  useEvents(instance, events);

  useBaseTileLayer(instance, options);

  return instance;
};

const instanceProperties = [...BaseTileLayerInstanceProperties] as const;
