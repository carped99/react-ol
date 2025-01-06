import { useCallback, useDebugValue } from 'react';
import Heatmap from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { HeatmapLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useBaseObjectProvider } from '../hooks/BaseObjectProvider';

/**
 * {@link Heatmap}를 생성한다.
 * @param options - {@link HeatmapLayerOptions}
 *
 * @category Layers
 */
export const useHeatmapLayer = <F extends FeatureLike = Feature<Geometry>, S extends VectorSource<F> = VectorSource<F>>(
  options: Readonly<HeatmapLayerOptions<F, S>>,
) => {
  useDebugValue(options);

  const provider = useBaseObjectProvider<Heatmap<F, S>, HeatmapLayerOptions<F, S>>(
    useCallback((options) => new Heatmap<F, S>(options), []),
  );

  return useInstance(provider, options);

  // const layer = useMemo(() => {
  //   return new Heatmap<F, S>(options);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [options.weight]);
  //
  // useBaseVectorLayer<F, S>(layer, options);
  //
  // useEffect(() => {
  //   if (options.gradient != null && layer.getGradient() !== options.gradient) {
  //     layer.setGradient(options.gradient);
  //   }
  // }, [layer, options.gradient]);
  //
  // useEffect(() => {
  //   if (options.radius != null && layer.getRadius() !== options.radius) {
  //     layer.setRadius(options.radius);
  //   }
  // }, [layer, options.radius]);
  //
  // useEffect(() => {
  //   if (options.blur != null && layer.getBlur() !== options.blur) {
  //     layer.setBlur(options.blur);
  //   }
  // }, [layer, options.blur]);
  //
  // return layer;
};
