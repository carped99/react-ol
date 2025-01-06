import { useCallback, useDebugValue } from 'react';
import VectorImageLayer from 'ol/layer/VectorImage';
import { FeatureLike } from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { VectorImageLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { BaseVectorLayerUpdateKeys } from './base/LayerProperties';

/**
 * {@link VectorImageLayer}를 생성한다.
 * @param options - {@link VectorImageLayerOptions}
 *
 * @category Layers
 */
export const useVectorImageLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: VectorImageLayerOptions<S, F>,
) => {
  useDebugValue(options);

  const provider = useBaseObjectProvider<VectorImageLayer<S, F>, VectorImageLayerOptions<S, F>>(
    useCallback((options) => new VectorImageLayer<S, F>(options), []),
    createKeys,
    BaseVectorLayerUpdateKeys,
  );

  return useInstance(provider, options);
};

const createKeys = ['className', 'imageRatio'] as const;
