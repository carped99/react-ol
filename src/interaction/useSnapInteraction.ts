import { useMemo } from 'react';
import { Snap } from 'ol/interaction';
import { Options } from 'ol/interaction/Snap';
import { useInteraction } from './useInteraction';

/**
 * Handles snapping of vector features while modifying or drawing them.
 * @param active Whether the interaction should be active.
 * @param options {@link Options} for the interaction.
 * @return {@link Snap}
 */
export const useSnapInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Snap => {
  if (!options.features && !options.source) {
    throw new Error('snapOptions should have features or source');
  }

  const interaction = useMemo(() => new Snap(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
