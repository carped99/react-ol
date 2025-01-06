import { KeyboardZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardZoom';
import { useInteraction } from './useInteraction';
import { KeyboardZoomInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

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
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: Options) => {
  return new KeyboardZoom(options);
};

const provider = createBaseObjectProvider(create, [], []);
