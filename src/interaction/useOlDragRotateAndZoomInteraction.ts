import { useMemo } from 'react';
import { DragRotateAndZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DragRotateAndZoom';
import { useOlInteraction } from './useOlInteraction';
import { OlDragRotateAndZoomInteractionEvents } from '@src/interaction/event';

/**
 * Options for the {@link useOlDragRotateAndZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragRotateAndZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom and rotate the map by clicking and dragging on the map.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragRotateAndZoom-DragRotateAndZoom.html | DragRotateAndZoom}
 * @category Interaction
 */
export const useOlDragRotateAndZoomInteraction = (
  options: OlDragRotateAndZoomInteractionOptions = {},
  observable?: OlDragRotateAndZoomInteractionEvents<DragRotateAndZoom>,
  active = true,
) => {
  const interaction = useMemo(() => new DragRotateAndZoom(options), [options]);

  useOlInteraction(interaction, observable, active);

  return interaction;
};
