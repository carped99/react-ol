import { useMemo } from 'react';
import { DragRotate } from 'ol/interaction';
import { Options } from 'ol/interaction/DragRotate';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to rotate the map by clicking and dragging on the map.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDragRotateInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragRotate => {
  const interaction = useMemo(() => new DragRotate(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
