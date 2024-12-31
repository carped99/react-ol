import { useMemo } from 'react';
import { Select } from 'ol/interaction';
import { Options } from 'ol/interaction/Select';
import { useInteraction } from './useInteraction';

/**
 * Interaction for selecting vector features.
 * @param active Whether the interaction should be active.
 * @param options {@link Options} for the interaction.
 * @returns {@link Select}.
 */
export const useSelectInteraction = (options: Options = {}, active = true): Select => {
  const interaction = useMemo(() => new Select(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
