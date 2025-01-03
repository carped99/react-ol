import { useDebugValue, useEffect, useMemo } from 'react';
import VectorTileLayer, { ExtractedFeatureType, Options } from 'ol/layer/VectorTile';
import { VectorTile } from 'ol/source';
import { FeatureLike } from 'ol/Feature';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';

/**
 * {@link VectorTileLayer}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorTileLayerOptions<
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}

/**
 * {@link VectorTileLayer}를 생성한다.
 * @param options - {@link VectorTileLayerOptions}
 *
 * @category Layer
 */
export const useVectorTileLayer = <
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: Readonly<VectorTileLayerOptions<S, F>>,
) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new VectorTileLayer<S, F>(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.renderMode, options.updateWhileAnimating, options.updateWhileInteracting, options.cacheSize]);

  useBaseVectorLayer<F, S>(layer, options);

  useEffect(() => {
    if (options.preload != null && layer.getPreload() !== options.preload) {
      layer.setPreload(options.preload);
    }
  }, [layer, options.preload]);

  return layer;
};
