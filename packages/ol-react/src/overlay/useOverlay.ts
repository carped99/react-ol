import Overlay, { Options } from 'ol/Overlay.js';
import { useEffect } from 'react';
import { createInstanceProviderByKey, InstanceProperty, useInstance } from '../base';
import { useMapContext } from '../context';
import { useEvents } from '../events';

import { OverlayEvents } from './events';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OverlayOptions extends Options {}

export const useOverlay = (options: OverlayOptions, events?: OverlayEvents) => {
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
