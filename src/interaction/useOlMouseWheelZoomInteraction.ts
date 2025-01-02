import { useMemo } from 'react';
import { MouseWheelZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/MouseWheelZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlMouseWheelZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlMouseWheelZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_MouseWheelZoom-MouseWheelZoom.html | MouseWheelZoom}
 * @category Interaction
 */
export const useOlMouseWheelZoomInteraction = (options: OlMouseWheelZoomInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new MouseWheelZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};