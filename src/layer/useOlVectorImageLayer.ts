import { useDebugValue, useMemo } from 'react';
import VectorImageLayer, { Options } from 'ol/layer/VectorImage';
import { FeatureLike } from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { useOlBaseVectorLayer } from '@src/layer/base/useOlBaseVectorLayer';

/**
 * {@link VectorImageLayer}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorImageLayerOptions<
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}

/**
 * {@link VectorImageLayer}를 생성한다.
 * @param options - {@link VectorImageLayerOptions}
 *
 * @category Layer
 */
export const useOlVectorImageLayer = <
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: Readonly<VectorImageLayerOptions<S, F>>,
) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new VectorImageLayer<S, F>(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.imageRatio]);

  useOlBaseVectorLayer<F, S>(layer, options);

  return layer;
};
