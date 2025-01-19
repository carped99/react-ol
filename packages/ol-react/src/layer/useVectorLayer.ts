import { useCallback, useDebugValue } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { VectorLayerOptions } from './options';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { VectorLayerEvents } from './events';
import { useEvents } from '../events';
import { InstanceProvider, useInstance, useInstanceProviderByKeys } from '../base';
import { BaseVectorInstanceProperties } from './base/LayerProperties';

/**
 * {@link VectorLayer}를 생성한다.
 * @param options - {@link VectorLayerOptions}
 * @param events - 이벤트 목록
 * @category Layers
 */
export const useVectorLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: VectorLayerOptions<S, F>,
  events?: VectorLayerEvents,
) => {
  useDebugValue(options);

  const provider = useInstanceProviderByKeys<VectorLayer<S, F>, VectorLayerOptions<S, F>>(
    useCallback((options) => new VectorLayer<S, F>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider as InstanceProvider<VectorLayer<S, F>, VectorLayerOptions<S, F>>, options);

  useBaseVectorLayer<F, S>(instance, options);

  useEvents(instance, events);

  return instance;
};

const instanceProperties = [...BaseVectorInstanceProperties] as const;
