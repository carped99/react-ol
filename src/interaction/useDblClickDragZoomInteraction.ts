import { useMemo } from 'react';
import { DblClickDragZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DblClickDragZoom';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to zoom the map by double tap/click then drag up/down with one finger/left mouse.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @return {@link DblClickDragZoom}
 */
export const useDblClickDragZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DblClickDragZoom => {
  const interaction = useMemo(() => new DblClickDragZoom(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
