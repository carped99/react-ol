import { useCallback, useDebugValue } from 'react';
import VectorTileLayer, { ExtractedFeatureType } from 'ol/layer/VectorTile';
import { VectorTile } from 'ol/source';
import { FeatureLike } from 'ol/Feature';
import { VectorTileLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { BaseVectorLayerCreateKeys, BaseVectorLayerUpdateKeys } from './base/LayerProperties';
import { useBaseObjectProvider } from '../hooks/BaseObjectProvider';

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

  const provider = useBaseObjectProvider<VectorTileLayer<S, F>, VectorTileLayerOptions<S, F>>(
    useCallback((options) => new VectorTileLayer<S, F>(options), []),
    createKeys,
    BaseVectorLayerUpdateKeys,
  );

  return useInstance(provider, options);
};

const createKeys = [...BaseVectorLayerCreateKeys, 'preload', 'cacheSize', 'renderMode'] as const;
