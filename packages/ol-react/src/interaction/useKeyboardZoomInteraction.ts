import KeyboardZoom, { Options } from 'ol/interaction/KeyboardZoom.js';
import { createInstanceProviderByKey, useInstance } from '../base';
import { KeyboardZoomInteractionEvents } from './event';
import { useInteraction } from './useInteraction';

/**
 * Options for the - {@link useKeyboardZoomInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface KeyboardZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map using keyboard + and -.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_KeyboardZoom-KeyboardZoom.html | KeyboardZoom}
 * @category Interaction
 */
export const useKeyboardZoomInteraction = (
  options: KeyboardZoomInteractionOptions = {},
  events?: KeyboardZoomInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new KeyboardZoom(options);

const instanceProperties = [
  { name: 'condition', settable: false },
  { name: 'duration', settable: false },
  { name: 'delta', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
