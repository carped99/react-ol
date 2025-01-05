import { Draw } from 'ol/interaction';
import { Options } from 'ol/interaction/Draw';
import { useInteraction } from './useInteraction';
import { DrawInteractionEvents } from './event';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { useInstance } from '../hooks/useInstance';

/**
 * Options for the - {@link useDrawInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawInteractionOptions extends Options {}

/**
 * Interaction for drawing feature geometries.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html | Draw}
 * @category Interaction
 */
export const useDrawInteraction = (
  options: DrawInteractionOptions,
  events?: DrawInteractionEvents<Draw>,
  active = true,
) => {
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: DrawInteractionOptions) => {
  return new Draw(options);
};

const provider = createBaseObjectProvider(create, [], []);
