import { useMemo } from 'react';
import VectorImageLayer, { Options } from 'ol/layer/VectorImage';
import { FeatureLike } from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { useBaseVectorLayer } from '@src/hooks/layer/base/useBaseVectorLayer';

export type VectorImageLayerOptions<
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> = Options<S, F>;

/**
 * {@link VectorImageLayer}를 생성한다.
 * @param options {@link VectorImageLayerOptions}
 */
export const useVectorImageLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: Readonly<VectorImageLayerOptions<S, F>>,
) => {
  const layer = useMemo(() => {
    console.info('==> Create VectorImageLayer', options);
    return new VectorImageLayer<S, F>(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.imageRatio]);

  useBaseVectorLayer<F, S>(layer, options);

  return layer;
};
