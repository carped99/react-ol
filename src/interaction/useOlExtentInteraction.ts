import { useMemo } from 'react';
import { Extent } from 'ol/interaction';
import { Options } from 'ol/interaction/Extent';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlExtentInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Extent => {
  const interaction = useMemo(() => new Extent(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
