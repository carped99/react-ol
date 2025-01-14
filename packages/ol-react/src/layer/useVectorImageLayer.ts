import { useCallback, useDebugValue } from 'react';
import VectorImageLayer from 'ol/layer/VectorImage';
import { FeatureLike } from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { VectorImageLayerOptions } from './options';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { BaseVectorInstanceProperties } from './base/ObservableProperties';
import { VectorImageLayerEvents } from './events';
import { useEvents } from '../events';
import { useInstance, useInstanceProviderByKeys } from '../base';

/**
 * {@link VectorImageLayer}를 생성한다.
 * @param options - {@link VectorImageLayerOptions}
 *
 * @param events - 이벤트 목록
 * @category Layers
 */
export const useVectorImageLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: VectorImageLayerOptions<S, F>,
  events?: VectorImageLayerEvents,
) => {
  useDebugValue(options);

  const provider = useInstanceProviderByKeys<VectorImageLayer<S, F>, VectorImageLayerOptions<S, F>>(
    useCallback((options) => new VectorImageLayer<S, F>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider, options);

  useBaseVectorLayer<F, S>(instance, options);

  useEvents(instance, events);

  return instance;
};

const instanceProperties = [...BaseVectorInstanceProperties, { name: 'imageRatio', settable: false }] as const;
