import View from 'ol/View';
import { useEvents } from '../events';
import { ViewEvents } from './events';
import { ViewOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

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

const updateKeys = [
  'enableRotation',
  'extent',
  'maxResolution',
  'minResolution',
  'projection',
  'resolutions',
  'zoomFactor',
] as const;

const nullishKeys = ['center', 'zoom', 'minZoom', 'maxZoom', 'constrainResolution', 'rotation'] as const;

const create = (options: Readonly<ViewOptions>) => new View(options);

const provider = createBaseObjectProvider(create, [], updateKeys, nullishKeys);
