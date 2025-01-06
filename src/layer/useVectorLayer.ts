import { useCallback, useDebugValue } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { VectorLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { BaseVectorLayerCreateKeys, BaseVectorLayerUpdateKeys } from './base/LayerProperties';
import { InstanceProvider } from '../hooks/InstanceProvider';

/**
 * {@link VectorLayer}를 생성한다.
 * @param options - {@link VectorLayerOptions}
 *
 * @category Layers
 */
export const useVectorLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: VectorLayerOptions<S, F>,
) => {
  useDebugValue(options);

  const provider = useBaseObjectProvider<VectorLayer<S, F>, VectorLayerOptions<S, F>>(
    useCallback((options) => new VectorLayer<S, F>(options), []),
    BaseVectorLayerCreateKeys,
    BaseVectorLayerUpdateKeys,
  );

  return useInstance(provider as InstanceProvider<VectorLayer<S, F>, VectorLayerOptions<S, F>>, options);
};
