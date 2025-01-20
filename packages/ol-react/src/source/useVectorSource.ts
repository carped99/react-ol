import { createInstanceProviderByKey, useInstance } from '../base';
import VectorSource, { Options, VectorSourceEvent } from 'ol/source/Vector';
import { useEvents } from '../events';
import { BaseEvents } from '../events/BaseEvents';

export interface VectorSourceEvents extends BaseEvents {
  onAddFeature?: (e: VectorSourceEvent) => void;
  onChangeFeature?: (e: VectorSourceEvent) => void;
  onClear?: (e: VectorSourceEvent) => void;
  onFeaturesLoadEnd?: (e: VectorSourceEvent) => void;
  onFeaturesLoadError?: (e: VectorSourceEvent) => void;
  onFeaturesLoadStart?: (e: VectorSourceEvent) => void;
  onRemoveFeature?: (e: VectorSourceEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorSourceOptions extends Options {}

export const useVectorSource = (options: VectorSourceOptions, events?: VectorSourceEvents) => {
  const instance = useInstance(instanceProvider, options);
  useEvents(instance, events);
  return instance;
};

const createInstance = (options: Options) => new VectorSource(options);

const instanceProperties = [
  { name: 'attributions', settable: true },
  { name: 'features', settable: false },
  { name: 'format', settable: false },
  { name: 'loader', settable: true },
  { name: 'overlaps', settable: false },
  { name: 'strategy', settable: false },
  { name: 'url', settable: true },
  { name: 'useSpatialIndex', settable: false },
  { name: 'wrapX', settable: false },
];

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
