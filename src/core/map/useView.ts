import View from 'ol/View';
import { useEvents } from '../events';
import { ViewEvents } from './events';
import { ViewOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/BaseObjectProvider';

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

const createKeys = [
  'constrainRotation',
  'enableRotation',
  'constrainOnlyCenter',
  'smoothExtentConstraint',
  'smoothResolutionConstraint',
  'minResolution',
  'maxResolution',
  'multiWorld',
  'showFullExtent',
  'projection',
  'resolutions',
  'zoomFactor',
  'padding',
] as const;

const updateKeys = ['center', 'constrainResolution', 'minZoom', 'maxZoom', 'resolution', 'zoom'] as const;

const create = (options: Readonly<ViewOptions>) => new View(options);

const provider = createInstanceProviderByKey(create, createKeys, updateKeys, []);
