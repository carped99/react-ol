import { useMemo } from 'react';
import { PinchZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchZoom';
import { useInteraction } from './useInteraction';
import { PinchZoomInteractionEvents } from './event';

/**
 * Options for the {@link usePinchZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PinchZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by pinching with two fingers on a touch screen.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_PinchZoom-PinchZoom.html | PinchZoom}
 * @category Interaction
 */
export const usePinchZoomInteraction = (
  options?: PinchZoomInteractionOptions,
  observable?: PinchZoomInteractionEvents<PinchZoom>,
  active = true,
) => {
  const interaction = useMemo(() => new PinchZoom(options), [options]);

  useInteraction(interaction, observable, active);

  return interaction;
};
