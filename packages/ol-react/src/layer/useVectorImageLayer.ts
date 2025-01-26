import { FeatureLike } from 'ol/Feature.js';
import { ExtractedFeatureType } from 'ol/layer/BaseVector.js';
import VectorImageLayer, { Options } from 'ol/layer/VectorImage.js';
import VectorSource from 'ol/source/Vector.js';
import { useCallback, useDebugValue } from 'react';
import { useInstance, useInstanceProviderByKeys } from '../base';
import { useEvents } from '../events';
import { BaseVectorInstanceProperties } from './base/LayerProperties';
import { useBaseVectorLayer } from './base/useBaseVectorLayer.js';
import { VectorImageLayerEvents } from './events';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorImageLayerOptions<
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}

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
