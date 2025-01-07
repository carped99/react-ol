import { useCallback, useDebugValue } from 'react';
import VectorImageLayer from 'ol/layer/VectorImage';
import { FeatureLike } from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { VectorImageLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useInstanceProviderByKeys } from '../hooks/BaseObjectProvider';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { BaseVectorInstanceProperties } from './base/ObservableProperties';

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

  const provider = useInstanceProviderByKeys<VectorImageLayer<S, F>, VectorImageLayerOptions<S, F>>(
    useCallback((options) => new VectorImageLayer<S, F>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider, options);

  useBaseVectorLayer<F, S>(instance, options);

  return instance;
};

const instanceProperties = [...BaseVectorInstanceProperties, { name: 'imageRatio', settable: false }] as const;
