import { useMemo } from 'react';
import { KeyboardZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardZoom';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to zoom the map using keyboard + and -.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link KeyboardZoom}
 */
export const useKeyboardZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): KeyboardZoom => {
  const interaction = useMemo(() => new KeyboardZoom(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
