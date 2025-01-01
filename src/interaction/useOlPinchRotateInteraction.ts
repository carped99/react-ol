import { useMemo } from 'react';
import { PinchRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchRotate';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to rotate the map by twisting with two fingers on a touch screen.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlPinchRotateInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): PinchRotate => {
  const interaction = useMemo(() => new PinchRotate(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
