import { useMemo } from 'react';
import PointerInteraction, { Options as PointerOptions } from 'ol/interaction/Pointer';
import { useOlInteraction } from './useOlInteraction';

export const useOlPointerInteraction = ({ active = true, ...options }: { active?: boolean } & PointerOptions) => {
  const interaction = useMemo(() => new PointerInteraction(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
