import { useCallback, useDebugValue } from 'react';
import VectorTileLayer, { ExtractedFeatureType } from 'ol/layer/VectorTile';
import { VectorTile } from 'ol/source';
import { FeatureLike } from 'ol/Feature';
import { VectorTileLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useInstanceProviderByKeys } from '../hooks/BaseObjectProvider';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { BaseVectorInstanceProperties } from './base/ObservableProperties';

/**
 * {@link VectorTileLayer}를 생성한다.
 * @param options - {@link VectorTileLayerOptions}
 *
 * @category Layers
 */
export const useVectorTileLayer = <
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: VectorTileLayerOptions<S, F>,
) => {
  useDebugValue(options);

  const provider = useInstanceProviderByKeys<VectorTileLayer<S, F>, VectorTileLayerOptions<S, F>>(
    useCallback((options) => new VectorTileLayer<S, F>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider, options);

  useBaseVectorLayer<F, S>(instance, options);

  return instance;
};

const instanceProperties = [
  ...BaseVectorInstanceProperties,
  { name: 'preload', settable: false },
  { name: 'cacheSize', settable: false },
  { name: 'renderMode', settable: false },
] as const;
