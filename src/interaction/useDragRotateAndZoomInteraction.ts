import { useMemo } from 'react';
import { DragRotateAndZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DragRotateAndZoom';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to zoom and rotate the map by clicking and dragging on the map.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @return {@link DragRotateAndZoom}
 */
export const useDragRotateAndZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragRotateAndZoom => {
  const interaction = useMemo(() => new DragRotateAndZoom(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
