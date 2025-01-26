import PinchRotate, { Options } from 'ol/interaction/PinchRotate.js';
import { createInstanceProviderByKey, useInstance } from '../base';
import { PinchRotateInteractionEvents } from './event';
import { useInteraction } from './useInteraction';

/**
 * Options for the - {@link usePinchRotateInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PinchRotateInteractionOptions extends Options {}

/**
 * Allows the user to rotate the map by twisting with two fingers on a touch screen.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_PinchRotate-PinchRotate.html | PinchRotate}
 * @category Interaction
 */
export const usePinchRotateInteraction = (
  options: PinchRotateInteractionOptions = {},
  events?: PinchRotateInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new PinchRotate(options);

const instanceProperties = [
  { name: 'duration', settable: false },
  { name: 'threshold', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
