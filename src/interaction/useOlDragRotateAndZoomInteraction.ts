import { useMemo } from 'react';
import { DragRotateAndZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DragRotateAndZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to zoom and rotate the map by clicking and dragging on the map.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDragRotateAndZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragRotateAndZoom => {
  const interaction = useMemo(() => new DragRotateAndZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
