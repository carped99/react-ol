import View from 'ol/View';
import { useEvents } from '../events';
import { ViewEvents } from './events';
import { ViewOptions } from './options';
import { createInstanceProviderByKey, useInstance } from '../base';

/**
 * Hook for creating an OpenLayers view.
 * @param options - Options for the view.
 * @param events - Events for the View.
 *
 * @category Base
 */
export const useView = (options: Readonly<ViewOptions>, events?: ViewEvents) => {
  const view = useInstance(provider, options);

  useEvents(view, events);

  return view;
};

const create = (options: Readonly<ViewOptions>) => new View(options);

const instanceProperties = [
  { name: 'constrainRotation', settable: false },
  { name: 'enableRotation', settable: false },
  { name: 'constrainOnlyCenter', settable: false },
  { name: 'smoothExtentConstraint', settable: false },
  { name: 'smoothResolutionConstraint', settable: false },
  { name: 'minResolution', settable: false },
  { name: 'maxResolution', settable: false },
  { name: 'multiWorld', settable: false },
  { name: 'showFullExtent', settable: false },
  { name: 'projection', settable: false },
  { name: 'resolutions', settable: false },
  { name: 'zoomFactor', settable: false },
  { name: 'padding', settable: false },
  { name: 'extent', settable: false },

  { name: 'center', settable: true, nullable: true },
  { name: 'constrainResolution', settable: true },
  { name: 'maxZoom', settable: true },
  { name: 'minZoom', settable: true },
  { name: 'rotation', settable: true },
  { name: 'resolution', settable: true, nullable: true },
  { name: 'zoom', settable: true },
] as const;

const provider = createInstanceProviderByKey(create, instanceProperties);
