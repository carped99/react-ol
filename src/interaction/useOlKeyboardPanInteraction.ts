import { useMemo } from 'react';
import { KeyboardPan } from 'ol/interaction';
import { Options } from 'ol/interaction/KeyboardPan';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlKeyboardPanInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlKeyboardPanInteractionOptions extends Options {}

/**
 * Allows the user to pan the map using keyboard arrows.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_KeyboardPan-KeyboardPan.html | KeyboardPan}
 * @category Interaction
 */
export const useOlKeyboardPanInteraction = (options: OlKeyboardPanInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new KeyboardPan(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
