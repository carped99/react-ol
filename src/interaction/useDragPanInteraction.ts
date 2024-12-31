import { useMemo } from 'react';
import { DragPan } from 'ol/interaction';
import { Options } from 'ol/interaction/DragPan';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to pan the map by dragging the map.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @return {@link DragPan}
 */
export const useDragPanInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragPan => {
  const interaction = useMemo(() => new DragPan(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
