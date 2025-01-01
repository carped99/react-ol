import { useMemo } from 'react';
import { DragPan } from 'ol/interaction';
import { Options } from 'ol/interaction/DragPan';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to pan the map by dragging the map.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDragPanInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DragPan => {
  const interaction = useMemo(() => new DragPan(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
