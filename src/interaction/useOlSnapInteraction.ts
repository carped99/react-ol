import { useMemo } from 'react';
import { Snap } from 'ol/interaction';
import { Options } from 'ol/interaction/Snap';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlSnapInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlSnapInteractionOptions extends Options {}

/**
 * Handles snapping of vector features while modifying or drawing them.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Snap-Snap.html | Snap}
 * @category Interaction
 */
export const useOlSnapInteraction = (options: OlSnapInteractionOptions = {}, active = true) => {
  if (!options.features && !options.source) {
    throw new Error('snapOptions should have features or source');
  }

  const interaction = useMemo(() => new Snap(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
