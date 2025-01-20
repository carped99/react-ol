import { useCallback, useDebugValue } from 'react';
import Heatmap, { Options } from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { HeatmapLayerEvents } from './events';
import { useEvents } from '../events';
import { useInstance, useInstanceProviderByKeys } from '../base';
import { BaseVectorInstanceProperties } from './base/LayerProperties';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeatmapLayerOptions<
  F extends FeatureLike = Feature<Geometry>,
  S extends VectorSource<F> = VectorSource<F>,
> extends Options<F, S> {}

/**
 * {@link Heatmap}를 생성한다.
 * @param options - {@link HeatmapLayerOptions}
 * @param events - 이벤트 목록
 *
 * @category Layers
 */
export const useHeatmapLayer = <F extends FeatureLike = Feature<Geometry>, S extends VectorSource<F> = VectorSource<F>>(
  options: Readonly<HeatmapLayerOptions<F, S>>,
  events?: HeatmapLayerEvents,
) => {
  useDebugValue(options);

  const provider = useInstanceProviderByKeys<Heatmap<F, S>, HeatmapLayerOptions<F, S>>(
    useCallback((options) => new Heatmap<F, S>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider, options);

  useEvents(instance, events);

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
