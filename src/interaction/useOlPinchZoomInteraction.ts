import { useMemo } from 'react';
import { PinchZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchZoom';
import { useOlInteraction } from './useOlInteraction';
import { OlPinchZoomInteractionEvents } from '@src/interaction/event';

/**
 * Options for the {@link useOlPinchZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlPinchZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by pinching with two fingers on a touch screen.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_PinchZoom-PinchZoom.html | PinchZoom}
 * @category Interaction
 */
export const useOlPinchZoomInteraction = (
  options?: OlPinchZoomInteractionOptions,
  observable?: OlPinchZoomInteractionEvents<PinchZoom>,
  active = true,
) => {
  const interaction = useMemo(() => new PinchZoom(options), [options]);

  useOlInteraction(interaction, observable, active);

  return interaction;
};
