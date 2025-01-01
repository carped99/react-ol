import { useMemo } from 'react';
import { DoubleClickZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DoubleClickZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Allows the user to zoom by double-clicking on the map.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDblClickZoomInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): DoubleClickZoom => {
  const interaction = useMemo(() => new DoubleClickZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
