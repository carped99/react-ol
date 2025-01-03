import { useMemo } from 'react';
import { PinchRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchRotate';
import { useInteraction } from './useInteraction';
import { PinchRotateInteractionEvents } from './event';

/**
 * Options for the {@link usePinchRotateInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PinchRotateInteractionOptions extends Options {}

/**
 * Allows the user to rotate the map by twisting with two fingers on a touch screen.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_PinchRotate-PinchRotate.html | PinchRotate}
 * @category Interaction
 */
export const usePinchRotateInteraction = (
  options?: PinchRotateInteractionOptions,
  observable?: PinchRotateInteractionEvents<PinchRotate>,
  active = true,
) => {
  const interaction = useMemo(() => new PinchRotate(options), [options]);

  useInteraction(interaction, observable, active);

  return interaction;
};
