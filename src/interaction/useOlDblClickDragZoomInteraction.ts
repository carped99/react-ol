import { useMemo } from 'react';
import { DblClickDragZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DblClickDragZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlDblClickDragZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDblClickDragZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by double tap/click then drag up/down with one finger/left mouse.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DblClickDragZoom-DblClickDragZoom.html | DblClickDragZoom}.
 * @category Interaction
 */
export const useOlDblClickDragZoomInteraction = (options: OlDblClickDragZoomInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new DblClickDragZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
