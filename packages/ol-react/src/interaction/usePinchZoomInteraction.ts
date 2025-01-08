import { PinchZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchZoom';
import { useInteraction } from './useInteraction';
import { PinchZoomInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/InstanceProviderByProperties';

/**
 * Options for the - {@link usePinchZoomInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PinchZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by pinching with two fingers on a touch screen.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_PinchZoom-PinchZoom.html | PinchZoom}
 * @category Interaction
 */
export const usePinchZoomInteraction = (
  options: PinchZoomInteractionOptions = {},
  events?: PinchZoomInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => {
  return new PinchZoom(options);
};

const instanceProperties = [{ name: 'duration', settable: false }] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
