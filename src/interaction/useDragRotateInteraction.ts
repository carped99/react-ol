import { useMemo } from 'react';
import { DragRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/DragRotate';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to rotate the map by clicking and dragging on the map.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link DragRotate}
 */
export const useDragRotateInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragRotate => {
  const interaction = useMemo(() => new DragRotate(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
