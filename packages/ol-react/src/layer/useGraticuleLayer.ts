import { useDebugValue } from 'react';
import Graticule from 'ol/layer/Graticule';
import { GraticuleLayerOptions } from './options';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { BaseVectorInstanceProperties } from './base/ObservableProperties';
import { GraticuleLayerEvents } from './events/GraticuleLayerEvents';
import { useEvents } from '../events';
import { createInstanceProviderByKey, useInstance } from '../base';

/**
 * {@link Graticule}를 생성한다.
 * @param options - {@link GraticuleLayerOptions}
 * @param events - 이벤트 목록
 * @category Layers
 */
export const useGraticuleLayer = (options: Readonly<GraticuleLayerOptions>, events?: GraticuleLayerEvents) => {
  useDebugValue(options);

  const instance = useInstance(provider, options);

  useEvents(instance, events);

  useBaseVectorLayer<Feature<Geometry>, VectorSource<Feature<Geometry>>>(instance, options);

  return instance;
};

const instanceProperties = [
  ...BaseVectorInstanceProperties,
  { name: 'strokeStyle', settable: false },
  { name: 'targetSize', settable: false },
  { name: 'showLabels', settable: false },
  { name: 'maxLines', settable: false },
  { name: 'lonLabelFormatter', settable: false },
  { name: 'latLabelFormatter', settable: false },
  { name: 'lonLabelPosition', settable: false },
  { name: 'latLabelPosition', settable: false },
  { name: 'lonLabelStyle', settable: false },
  { name: 'latLabelStyle', settable: false },
  { name: 'intervals', settable: false },
  { name: 'wrapX', settable: false },
] as const;

const createInstance = (options: Readonly<GraticuleLayerOptions>) => new Graticule(options);

const provider = createInstanceProviderByKey(createInstance, instanceProperties);
