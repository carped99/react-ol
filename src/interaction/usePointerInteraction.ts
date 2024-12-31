import { useMemo } from 'react';
import PointerInteraction, { Options as PointerOptions } from 'ol/interaction/Pointer';
import { useInteraction } from './useInteraction';

export const usePointerInteraction = ({ active = true, ...options }: { active?: boolean } & PointerOptions) => {
  const interaction = useMemo(() => new PointerInteraction(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
