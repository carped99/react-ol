import { useCallback, useDebugValue } from 'react';
import Heatmap from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { HeatmapLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useInstanceProviderByKeys } from '../hooks/BaseObjectProvider';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { BaseVectorInstanceProperties } from './base/ObservableProperties';

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

  const provider = useInstanceProviderByKeys<Heatmap<F, S>, HeatmapLayerOptions<F, S>>(
    useCallback((options) => new Heatmap<F, S>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider, options);

  useBaseVectorLayer<F, S>(instance, options);

  return instance;
};

const instanceProperties = [
  ...BaseVectorInstanceProperties,
  { name: 'gradient', settable: true },
  { name: 'radius', settable: true },
  { name: 'blur', settable: true },
  { name: 'weight', settable: true },
] as const;
