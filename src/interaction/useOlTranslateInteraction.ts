import { useMemo } from 'react';
import { Translate } from 'ol/interaction';
import { Options } from 'ol/interaction/Translate';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlTranslateInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlTranslateInteractionOptions extends Options {}

/**
 * Interaction for translating (moving) features.
 * @param options -Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Translate-Translate.html | Translate}
 * @category Interaction
 */
export const useOlTranslateInteraction = (options: OlTranslateInteractionOptions = {}, active = true) => {
  const translate = useMemo(() => new Translate(options), [options]);

  useOlInteraction(translate, active);

  return translate;
};
