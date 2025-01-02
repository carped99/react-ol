import { useMemo } from 'react';
import { KeyboardZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardZoom';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlKeyboardZoomInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlKeyboardZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map using keyboard + and -.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_KeyboardZoom-KeyboardZoom.html | KeyboardZoom}
 * @category Interaction
 */
export const useOlKeyboardZoomInteraction = (options: OlKeyboardZoomInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new KeyboardZoom(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
