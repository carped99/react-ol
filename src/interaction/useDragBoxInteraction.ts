import { useMemo } from 'react';
import { DragBox } from 'ol/interaction';
import { Options } from 'ol/interaction/DragBox';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @return {@link DragBox}
 */
export const useDragBoxInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragBox => {
  const interaction = useMemo(() => new DragBox(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
