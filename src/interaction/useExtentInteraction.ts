import { useMemo } from 'react';
import { Extent } from 'ol/interaction';
import { Options } from 'ol/interaction/Extent';
import { useInteraction } from './useInteraction';
import { ExtentInteractionEvents } from './event';

/**
 * Options for the - {@link useExtentInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExtentInteractionOptions extends Options {}

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Extent-Extent.html | Extent}
 * @category Interaction
 */
export const useExtentInteraction = (
  options?: ExtentInteractionOptions,
  events?: ExtentInteractionEvents<Extent>,
  active = true,
) => {
  const interaction = useMemo(() => new Extent(options), [options]);

  useInteraction(interaction, events, active);

  return interaction;
};
