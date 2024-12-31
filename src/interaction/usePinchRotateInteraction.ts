import { useMemo } from 'react';
import { PinchRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchRotate';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to rotate the map by twisting with two fingers on a touch screen.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link PinchRotate}
 */
export const usePinchRotateInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): PinchRotate => {
  const interaction = useMemo(() => new PinchRotate(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
