import { useMemo } from 'react';
import { MouseWheelZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/MouseWheelZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlMouseWheelZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): MouseWheelZoom => {
  const interaction = useMemo(() => new MouseWheelZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
