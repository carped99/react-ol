import { useDebugValue, useEffect, useMemo } from 'react';
import Heatmap, { Options } from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';

/**
 * {@link HeatmapLayer}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeatmapLayerOptions<
  F extends FeatureLike = Feature<Geometry>,
  S extends VectorSource<F> = VectorSource<F>,
> extends Options<F, S> {}

/**
 * {@link Heatmap}를 생성한다.
 * @param options - {@link HeatmapLayerOptions}
 *
 * @category Layer
 */
export const useHeatmapLayer = <F extends FeatureLike = Feature<Geometry>, S extends VectorSource<F> = VectorSource<F>>(
  options: Readonly<HeatmapLayerOptions<F, S>>,
) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new Heatmap<F, S>(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.weight]);

  useBaseVectorLayer<F, S>(layer, options);

  useEffect(() => {
    if (options.gradient != null && layer.getGradient() !== options.gradient) {
      layer.setGradient(options.gradient);
    }
  }, [layer, options.gradient]);

  useEffect(() => {
    if (options.radius != null && layer.getRadius() !== options.radius) {
      layer.setRadius(options.radius);
    }
  }, [layer, options.radius]);

  useEffect(() => {
    if (options.blur != null && layer.getBlur() !== options.blur) {
      layer.setBlur(options.blur);
    }
  }, [layer, options.blur]);

  return layer;
};
