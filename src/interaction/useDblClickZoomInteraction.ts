import { useMemo } from 'react';
import { DoubleClickZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DoubleClickZoom';
import { useInteraction } from './useInteraction';

/**
 * Allows the user to zoom by double-clicking on the map.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @return {@link DoubleClickZoom}
 */
export const useDblClickZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DoubleClickZoom => {
  const interaction = useMemo(() => new DoubleClickZoom(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
