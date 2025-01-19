import { Overlay } from 'ol';
import { Options } from 'ol/Overlay';
import { OverlayEvents } from './events';
import { createInstanceProviderByKey, InstanceProperty, useInstance } from '../base';
import { useEffect } from 'react';
import { useEvents } from '../events';
import { useMapContext } from '../context';

export const useOverlay = (options: Options, events?: OverlayEvents) => {
  const { map } = useMapContext();

  const instance = useInstance(instanceProvider, options);

  useEffect(() => {
    if (!map || !instance) return;

    map.addOverlay(instance);

    return () => {
      map.removeOverlay(instance);
    };
  }, [map, instance]);

  useEvents(instance, events);

  return instance;
};

const createInstance = (options: Overlay | Options) => {
  if (options instanceof Overlay) {
    return options;
  } else {
    return new Overlay(options);
  }
};

const instanceProperties: InstanceProperty[] = [
  { name: 'id', settable: false },
  { name: 'element', settable: true, nullable: true },
  { name: 'offset', settable: true, nullable: false },
  { name: 'position', settable: true, nullable: true },
  { name: 'positioning', settable: true, nullable: true, nullValue: 'top-left' },
  { name: 'stopEvent', settable: false },
  { name: 'insertFirst', settable: false },
  { name: 'autoPan', settable: false },
  { name: 'className', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
