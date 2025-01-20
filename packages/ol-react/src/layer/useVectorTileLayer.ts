import { useCallback, useDebugValue } from 'react';
import VectorTileLayer, { ExtractedFeatureType, Options } from 'ol/layer/VectorTile';
import { VectorTile } from 'ol/source';
import { FeatureLike } from 'ol/Feature';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { VectorTileLayerEvents } from './events';
import { useEvents } from '../events';
import { useInstance, useInstanceProviderByKeys } from '../base';
import { BaseVectorInstanceProperties } from './base/LayerProperties';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorTileLayerOptions<
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}

/**
 * {@link VectorTileLayer}를 생성한다.
 * @param options - {@link VectorTileLayerOptions}
 * @param events - 이벤트 목록
 * @category Layers
 */
export const useVectorTileLayer = <
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: VectorTileLayerOptions<S, F>,
  events?: VectorTileLayerEvents,
) => {
  useDebugValue(options);

  const provider = useInstanceProviderByKeys<VectorTileLayer<S, F>, VectorTileLayerOptions<S, F>>(
    useCallback((options) => new VectorTileLayer<S, F>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider, options);

  useBaseVectorLayer<F, S>(instance, options);

  useEvents(instance, events);

  return instance;
};

const instanceProperties = [
  ...BaseVectorInstanceProperties,
  { name: 'preload', settable: false },
  { name: 'cacheSize', settable: false },
  { name: 'renderMode', settable: false },
] as const;
