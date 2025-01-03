import { useMemo } from 'react';
import { DragPan } from 'ol/interaction';
import { Options } from 'ol/interaction/DragPan';
import { useInteraction } from './useInteraction';
import { DragPanInteractionEvents } from './event';

/**
 * Options for {@link useDragPanInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragPanInteractionOptions extends Options {}

/**
 * Allows the user to pan the map by dragging the map.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragPan-DragPan.html | DragPan}
 * @category Interaction
 */
export const useDragPanInteraction = (
  options?: DragPanInteractionOptions,
  observable?: DragPanInteractionEvents<DragPan>,
  active = true,
) => {
  const interaction = useMemo(() => new DragPan(options), [options]);

  useInteraction(interaction, observable, active);

  return interaction;
};
