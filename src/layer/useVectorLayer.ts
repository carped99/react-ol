import { useDebugValue, useMemo } from 'react';
import VectorLayer, { Options } from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';

/**
 * {@link VectorLayer}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorLayerOptions<
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}

/**
 * {@link VectorLayer}를 생성한다.
 * @param options - {@link VectorLayerOptions}
 *
 * @category Layer
 */
export const useVectorLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: Readonly<VectorLayerOptions<S, F>>,
) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new VectorLayer<S, F>(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.updateWhileAnimating, options.updateWhileInteracting]);

  useBaseVectorLayer<F, S>(layer, options);

  return layer;
};
