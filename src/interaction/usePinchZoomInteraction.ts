import { useMemo } from 'react';
import { PinchZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchZoom';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to zoom the map by pinching with two fingers on a touch screen.
 * @param active Whether the interaction should be active.
 * @param options {@link Options} for the interaction.
 * @return {@link PinchZoom}
 */
export const usePinchZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): PinchZoom => {
  const interaction = useMemo(() => new PinchZoom(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
