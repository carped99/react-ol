import { useMemo } from 'react';
import { Draw } from 'ol/interaction';
import { Options } from 'ol/interaction/Draw';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlDrawInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDrawInteractionOptions extends Options {}

/**
 * Interaction for drawing feature geometries.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html | Draw}
 * @category Interaction
 */
export const useOlDrawInteraction = (options: OlDrawInteractionOptions, active = true) => {
  const interaction = useMemo(() => new Draw(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
