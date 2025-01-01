import { useMemo } from 'react';
import { Modify } from 'ol/interaction';
import { Options } from 'ol/interaction/Modify';
import { useOlInteraction } from './useOlInteraction';

/**
 * Interaction for modifying feature geometries.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlModifyInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Modify => {
  const interaction = useMemo(() => new Modify(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
