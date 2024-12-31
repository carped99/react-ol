import { useMemo } from 'react';
import { DragAndDrop } from 'ol/interaction';
import { Options } from 'ol/interaction/DragAndDrop';
import { useInteraction } from './useInteraction';

/**
 * Handles input of vector data by drag and drop.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @return {@link DragAndDrop}
 */
export const useDragAndDropInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragAndDrop => {
  const interaction = useMemo(() => new DragAndDrop(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
