import { useMemo } from 'react';
import { DragRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/DragRotate';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlDragRotateInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragRotateInteractionOptions extends Options {}

/**
 * Allows the user to rotate the map by clicking and dragging on the map.
 *
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragRotate-DragRotate.html | DragRotate}
 * @category Interaction
 */
export const useOlDragRotateInteraction = (options: OlDragRotateInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new DragRotate(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
