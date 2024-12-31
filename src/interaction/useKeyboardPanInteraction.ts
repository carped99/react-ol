import { useMemo } from 'react';
import { KeyboardPan } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardPan';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to pan the map using keyboard arrows.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link KeyboardPan}
 */
export const useKeyboardPanInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): KeyboardPan => {
  const interaction = useMemo(() => new KeyboardPan(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
