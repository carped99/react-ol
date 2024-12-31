import { useMemo } from 'react';
import { Modify } from 'ol/interaction';
import { Options } from 'ol/interaction/Modify';
import { useInteraction } from './useInteraction';

/**
 * Interaction for modifying feature geometries.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link Modify}
 */
export const useModifyInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Modify => {
  const interaction = useMemo(() => new Modify(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
