import { useDebugValue } from 'react';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { useBaseObject } from '../hooks/useBaseObject';
import { VectorLayerOptions } from './options';

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

  const layer = useBaseObject(options, create, createKeys, updateKeys);

  useBaseVectorLayer<F, S>(layer, options);

  return layer;
};

const create = <S extends VectorSource<F>, F extends FeatureLike>(options?: Readonly<VectorLayerOptions<S, F>>) =>
  new VectorLayer<S, F>(options);

// const update = <S extends VectorSource<F>, F extends FeatureLike>(
//   instance: VectorLayer<S, F>,
//   currProps: Readonly<VectorLayerOptions<S, F>>,
//   prevProps?: Readonly<VectorLayerOptions<S, F>>,
// ) => {
//   console.log('update', instance, currProps, prevProps);
// };

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
