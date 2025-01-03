import { useMemo } from 'react';
import { DoubleClickZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DoubleClickZoom';
import { useInteraction } from './useInteraction';
import { DblClickZoomInteractionEvents } from './event';

/**
 * Options for the {@link useDblClickZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DblClickZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom by double-clicking on the map.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DoubleClickZoom-DoubleClickZoom.html | DoubleClickZoom}.
 * @category Interaction
 */
export const useDblClickZoomInteraction = (
  options?: DblClickZoomInteractionOptions,
  observable?: DblClickZoomInteractionEvents<DoubleClickZoom>,
  active = true,
) => {
  const interaction = useMemo(() => new DoubleClickZoom(options), [options]);

  useInteraction(interaction, observable, active);

  return interaction;
};
