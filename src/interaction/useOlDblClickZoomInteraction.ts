import { useMemo } from 'react';
import { DoubleClickZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DoubleClickZoom';
import { useOlInteraction } from './useOlInteraction';
import { OlDblClickZoomInteractionEvents } from '@src/interaction/event';

/**
 * Options for the {@link useOlDblClickZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDblClickZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom by double-clicking on the map.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DoubleClickZoom-DoubleClickZoom.html | DoubleClickZoom}.
 * @category Interaction
 */
export const useOlDblClickZoomInteraction = (
  options?: OlDblClickZoomInteractionOptions,
  observable?: OlDblClickZoomInteractionEvents<DoubleClickZoom>,
  active = true,
) => {
  const interaction = useMemo(() => new DoubleClickZoom(options), [options]);

  useOlInteraction(interaction, observable, active);

  return interaction;
};
