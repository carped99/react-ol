import { useMemo } from 'react';
import { DragPan } from 'ol/interaction';
import { Options } from 'ol/interaction/DragPan';
import { useOlInteraction } from './useOlInteraction';
import { OlDragPanInteractionEvents } from '@src/interaction/event';

/**
 * Options for {@link useOlDragPanInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragPanInteractionOptions extends Options {}

/**
 * Allows the user to pan the map by dragging the map.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragPan-DragPan.html | DragPan}
 * @category Interaction
 */
export const useOlDragPanInteraction = (
  options?: OlDragPanInteractionOptions,
  observable?: OlDragPanInteractionEvents<DragPan>,
  active = true,
) => {
  const interaction = useMemo(() => new DragPan(options), [options]);

  useOlInteraction(interaction, observable, active);

  return interaction;
};
