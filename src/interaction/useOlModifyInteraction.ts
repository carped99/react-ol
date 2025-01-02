import { useMemo } from 'react';
import { Modify } from 'ol/interaction';
import { Options } from 'ol/interaction/Modify';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlModifyInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlModifyInteractionOptions extends Options {}

/**
 * Interaction for modifying feature geometries.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Modify-Modify.html | Modify}
 * @category Interaction
 */
export const useOlModifyInteraction = (options: OlModifyInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new Modify(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};