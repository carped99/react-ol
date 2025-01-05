import { useMemo } from 'react';
import { DragAndDrop } from 'ol/interaction';
import { Options } from 'ol/interaction/DragAndDrop';
import { useInteraction } from './useInteraction';
import { DragAndDropInteractionEvents } from './event';

/**
 * Options for the - {@link useDragAndDropInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragAndDropInteractionOptions extends Options {}

/**
 * Handles input of vector data by drag and drop.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragAndDrop-DragAndDrop.html | DragAndDrop}
 * @category Interaction
 */
export const useDragAndDropInteraction = (
  options?: DragAndDropInteractionOptions,
  events?: DragAndDropInteractionEvents<DragAndDrop>,
  active = true,
) => {
  const interaction = useMemo(() => new DragAndDrop(options), [options]);

  useInteraction(interaction, events, active);

  return interaction;
};
