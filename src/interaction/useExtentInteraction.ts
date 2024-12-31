import { useMemo } from 'react';
import { Extent } from 'ol/interaction';
import { Options } from 'ol/interaction/Extent';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link Extent}
 */
export const useExtentInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Extent => {
  const interaction = useMemo(() => new Extent(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
