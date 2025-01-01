import { useMemo } from 'react';
import { Draw } from 'ol/interaction';
import { Options } from 'ol/interaction/Draw';
import { useOlInteraction } from './useOlInteraction';

/**
 * Interaction for drawing feature geometries.
 * @param active - Whether the interaction should be active.
 * @param options {@link Options} for the interaction.
 *
 * @category Interaction
 */
export const useOlDrawInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Draw => {
  const interaction = useMemo(() => new Draw(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
