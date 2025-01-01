import { useMemo } from 'react';
import { DragBox } from 'ol/interaction';
import { Options } from 'ol/interaction/DragBox';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDragBoxInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragBox => {
  const interaction = useMemo(() => new DragBox(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
