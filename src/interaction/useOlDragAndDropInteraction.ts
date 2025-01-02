import { useMemo } from 'react';
import { DragAndDrop } from 'ol/interaction';
import { Options } from 'ol/interaction/DragAndDrop';
import { useOlInteraction } from './useOlInteraction';
import { OlDragAndDropInteractionEvents } from '@src/interaction/event';

/**
 * Options for the {@link useOlDragAndDropInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragAndDropInteractionOptions extends Options {}

/**
 * Handles input of vector data by drag and drop.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragAndDrop-DragAndDrop.html | DragAndDrop}
 * @category Interaction
 */
export const useOlDragAndDropInteraction = (
  options?: OlDragAndDropInteractionOptions,
  observable?: OlDragAndDropInteractionEvents<DragAndDrop>,
  active = true,
) => {
  const interaction = useMemo(() => new DragAndDrop(options), [options]);

  useOlInteraction(interaction, observable, active);

  return interaction;
};
