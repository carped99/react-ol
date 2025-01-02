import { useMemo } from 'react';
import PointerInteraction, { Options } from 'ol/interaction/Pointer';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlPointerInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlPointerInteractionOptions extends Options {}

/**
 * Base class that calls user-defined functions on down, move and up events.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Pointer-Pointer.html | Pointer}
 * @category Interaction
 */
export const useOlPointerInteraction = (options: OlPointerInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new PointerInteraction(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
