import { useMemo } from 'react';
import { KeyboardZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to zoom the map using keyboard + and -.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlKeyboardZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): KeyboardZoom => {
  const interaction = useMemo(() => new KeyboardZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
