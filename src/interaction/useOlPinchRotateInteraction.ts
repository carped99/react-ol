import { useMemo } from 'react';
import { PinchRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/PinchRotate';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlPinchRotateInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlPinchRotateInteractionOptions extends Options {}

/**
 * Allows the user to rotate the map by twisting with two fingers on a touch screen.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_PinchRotate-PinchRotate.html | PinchRotate}
 * @category Interaction
 */
export const useOlPinchRotateInteraction = (options: OlPinchRotateInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new PinchRotate(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
