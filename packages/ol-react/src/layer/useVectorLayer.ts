import { FeatureLike } from 'ol/Feature.js';
import { ExtractedFeatureType } from 'ol/layer/BaseVector.js';
import VectorLayer, { Options } from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { useCallback, useDebugValue } from 'react';
import { InstanceProvider, useInstance, useInstanceProviderByKeys } from '../base';
import { useEvents } from '../events';
import { BaseVectorInstanceProperties } from './base/LayerProperties';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { VectorLayerEvents } from './events';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorLayerOptions<
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}

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
