import { useMemo } from 'react';
import { Translate } from 'ol/interaction';
import { Options } from 'ol/interaction/Translate';
import { useInteraction } from './useInteraction';
import { TranslateInteractionEvents } from './event';

/**
 * Options for the - {@link useTranslateInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TranslateInteractionOptions extends Options {}

/**
 * Interaction for translating (moving) features.
 * @param options -Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Translate-Translate.html | Translate}
 * @category Interaction
 */
export const useTranslateInteraction = (
  options?: TranslateInteractionOptions,
  events?: TranslateInteractionEvents<Translate>,
  active = true,
) => {
  const translate = useMemo(() => new Translate(options), [options]);

  useInteraction(translate, events, active);

  return translate;
};
