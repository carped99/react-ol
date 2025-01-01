import { useMemo } from 'react';
import { KeyboardPan } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardPan';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to pan the map using keyboard arrows.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlKeyboardPanInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): KeyboardPan => {
  const interaction = useMemo(() => new KeyboardPan(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
