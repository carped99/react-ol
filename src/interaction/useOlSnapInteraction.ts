import { useMemo } from 'react';
import { Snap } from 'ol/interaction';
import { Options } from 'ol/interaction/Snap';
import { useOlInteraction } from './useOlInteraction';

/**
 * Handles snapping of vector features while modifying or drawing them.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options} for the interaction.
 *
 * @category Interaction
 */
export const useOlSnapInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Snap => {
  if (!options.features && !options.source) {
    throw new Error('snapOptions should have features or source');
  }

  const interaction = useMemo(() => new Snap(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
