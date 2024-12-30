import { useEffect, useMemo } from 'react';
import VectorTileLayer, { ExtractedFeatureType, Options } from 'ol/layer/VectorTile';
import { VectorTile } from 'ol/source';
import { FeatureLike } from 'ol/Feature';
import { useBaseVectorLayer } from '@src/hooks/layer/base/useBaseVectorLayer';

export type VectorTileLayerOptions<
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> = Options<S, F>;

/**
 * {@link VectorTileLayer}를 생성한다.
 * @param options {@link VectorTileLayerOptions}
 */
export const useVectorTileLayer = <
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
>(
  options: VectorTileLayerOptions<S, F>,
) => {
  const layer = useMemo(() => {
    console.info('==> Create VectorTileLayer', options);
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
