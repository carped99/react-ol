import { useMemo } from 'react';
import { MouseWheelZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/MouseWheelZoom';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link MouseWheelZoom}
 */
export const useMouseWheelZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): MouseWheelZoom => {
  const interaction = useMemo(() => new MouseWheelZoom(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
