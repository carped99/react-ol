import { useCallback, useDebugValue } from 'react';
import { Tile as TileLayer } from 'ol/layer';
import { Tile as TileSource } from 'ol/source';
import { Tile } from 'ol';
import { TileLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useInstanceProviderByKeys } from '../hooks/InstanceProviderByProperties';
import { useBaseTileLayer } from './base/useBaseTileLayer';
import { TileLayerEvents } from './events/TileLayerEvents';
import { useEvents } from '../events';
import { BaseTileLayerInstanceProperties } from './base/ObservableProperties';

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
