import { useDebugValue, useMemo } from 'react';
import VectorImageLayer from 'ol/layer/VectorImage';
import { FeatureLike } from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { VectorImageLayerOptions } from './options';

/**
 * {@link VectorImageLayer}를 생성한다.
 * @param options - {@link VectorImageLayerOptions}
 *
 * @category Layers
 */
export const useVectorImageLayer = <
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

  useBaseVectorLayer<F, S>(layer, options);

  return layer;
};
