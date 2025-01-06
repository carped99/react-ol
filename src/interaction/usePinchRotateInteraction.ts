import { PinchRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchRotate';
import { useInteraction } from './useInteraction';
import { PinchRotateInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

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
  events?: PinchRotateInteractionEvents<PinchRotate>,
  active = true,
) => {
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: Options) => {
  return new PinchRotate(options);
};

const provider = createBaseObjectProvider(create, [], []);
