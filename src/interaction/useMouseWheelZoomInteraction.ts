import { useMemo } from 'react';
import { MouseWheelZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/MouseWheelZoom';
import { useInteraction } from './useInteraction';
import { MouseWheelZoomInteractionEvents } from './event';

/**
 * Options for the {@link useMouseWheelZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MouseWheelZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_MouseWheelZoom-MouseWheelZoom.html | MouseWheelZoom}
 * @category Interaction
 */
export const useMouseWheelZoomInteraction = (
  options?: MouseWheelZoomInteractionOptions,
  observable?: MouseWheelZoomInteractionEvents<MouseWheelZoom>,
  active = true,
) => {
  const interaction = useMemo(() => new MouseWheelZoom(options), [options]);

  useInteraction(interaction, observable, active);

  return interaction;
};
