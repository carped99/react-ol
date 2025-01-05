import { useDebugValue } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { VectorLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';

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
  options: Readonly<VectorLayerOptions<S, F>>,
) => {
  useDebugValue(options);

  const instance = useInstance(provider, options);

  useBaseVectorLayer<F, S>(instance, options);

  return instance;
};

const create = <S extends VectorSource<F>, F extends FeatureLike>(options?: Readonly<VectorLayerOptions<S, F>>) =>
  new VectorLayer<S, F>(options);

const createKeys = ['map', 'className', 'updateWhileAnimating', 'updateWhileInteracting'] as const;
const updateKeys = [
  'minZoom',
  'maxZoom',
  'opacity',
  'visible',
  'zIndex',
  'extent',
  'minResolution',
  'maxResolution',
  'renderOrder',
  'source',
  'declutter',
  'style',
  'background',
  'properties',
] as const;

const provider = createBaseObjectProvider(create, createKeys, updateKeys);
