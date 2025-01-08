import { MouseWheelZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/MouseWheelZoom';
import { useInteraction } from './useInteraction';
import { MouseWheelZoomInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/InstanceProviderByProperties';

/**
 * Options for the - {@link useMouseWheelZoomInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MouseWheelZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_MouseWheelZoom-MouseWheelZoom.html | MouseWheelZoom}
 * @category Interaction
 */
export const useMouseWheelZoomInteraction = (
  options: MouseWheelZoomInteractionOptions = {},
  events?: MouseWheelZoomInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new MouseWheelZoom(options);

const instanceProperties = [
  { name: 'condition', settable: false },
  { name: 'onFocusOnly', settable: false },
  { name: 'maxDelta', settable: false },
  { name: 'duration', settable: false },
  { name: 'timeout', settable: false },
  { name: 'useAnchor', settable: true },
  { name: 'constrainResolution', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
