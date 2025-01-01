import { useMemo } from 'react';
import { DragAndDrop } from 'ol/interaction';
import { Options } from 'ol/interaction/DragAndDrop';
import { useOlInteraction } from './useOlInteraction';

/**
 * Handles input of vector data by drag and drop.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDragAndDropInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragAndDrop => {
  const interaction = useMemo(() => new DragAndDrop(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
