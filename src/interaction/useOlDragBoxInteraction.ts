import { useMemo } from 'react';
import { DragBox } from 'ol/interaction';
import { Options } from 'ol/interaction/DragBox';
import { useOlInteraction } from './useOlInteraction';
import { OlDragBoxInteractionEvents } from '@src/interaction/event';

/**
 * Options for the {@link OlDragBoxInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragBoxInteractionOptions extends Options {}

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragBox-DragBox.html | DragBox}
 * @category Interaction
 */
export const useOlDragBoxInteraction = (
  options?: OlDragBoxInteractionOptions,
  observable?: OlDragBoxInteractionEvents<DragBox>,
  active = true,
) => {
  const interaction = useMemo(() => new DragBox(options), [options]);

  useOlInteraction(interaction, observable, active);

  return interaction;
};
