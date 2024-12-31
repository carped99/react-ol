import { useMemo } from 'react';
import { Draw } from 'ol/interaction';
import { Options } from 'ol/interaction/Draw';
import { useInteraction } from './useInteraction';

/**
 * Interaction for drawing feature geometries.
 * @param active Whether the interaction should be active.
 * @param options {@link Options} for the interaction.
 * @returns {@link Draw}
 */
export const useDrawInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Draw => {
  const interaction = useMemo(() => new Draw(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
