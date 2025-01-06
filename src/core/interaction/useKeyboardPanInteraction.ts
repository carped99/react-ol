import { KeyboardPan } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardPan';
import { useInteraction } from './useInteraction';
import { KeyboardPanInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

/**
 * Options for the - {@link useKeyboardPanInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface KeyboardPanInteractionOptions extends Options {}

/**
 * Allows the user to pan the map using keyboard arrows.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_KeyboardPan-KeyboardPan.html | KeyboardPan}
 * @category Interaction
 */
export const useKeyboardPanInteraction = (
  options: KeyboardPanInteractionOptions = {},
  events?: KeyboardPanInteractionEvents,
  active = true,
) => {
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: Options) => {
  return new KeyboardPan(options);
};

const provider = createBaseObjectProvider(create, [], []);
