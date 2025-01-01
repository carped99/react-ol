import { useMemo } from 'react';
import { DblClickDragZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DblClickDragZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to zoom the map by double tap/click then drag up/down with one finger/left mouse.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDblClickDragZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DblClickDragZoom => {
  const interaction = useMemo(() => new DblClickDragZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
