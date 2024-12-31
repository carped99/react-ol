import { useMemo } from 'react';
import VectorLayer, { Options } from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { useBaseVectorLayer } from '@src/layer/base/useBaseVectorLayer';

export type VectorLayerOptions<
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> = Options<S, F>;

/**
 * {@link VectorLayer}를 생성한다.
 * @param options {@link VectorLayerOptions}
 */
export const useVectorLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: Readonly<VectorLayerOptions<S, F>>,
) => {
  const layer = useMemo(() => {
    console.info('==> Create VectorLayer', options);
    return new VectorLayer<S, F>(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.updateWhileAnimating, options.updateWhileInteracting]);

  useBaseVectorLayer<F, S>(layer, options);

  return layer;
};
