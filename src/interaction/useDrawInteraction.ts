import { Draw } from 'ol/interaction';
import { Options } from 'ol/interaction/Draw';
import { useInteraction } from './useInteraction';
import { DrawInteractionEvents } from './event';
import { useBaseObject } from '../hooks/useBaseObject';

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
  const interaction = useBaseObject(options, creator, [], []);

  // const interaction = useMemo(() => new Draw(options), [options]);

  useInteraction(interaction, events, active);

  return interaction;
};

const creator = (options: DrawInteractionOptions) => {
  return new Draw(options);
};
