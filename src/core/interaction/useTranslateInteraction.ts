import { Translate } from 'ol/interaction';
import { Options } from 'ol/interaction/Translate';
import { useInteraction } from './useInteraction';
import { TranslateInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

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
  options: TranslateInteractionOptions = {},
  events?: TranslateInteractionEvents<Translate>,
  active = true,
) => {
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: TranslateInteractionOptions) => {
  return new Translate(options);
};

const provider = createBaseObjectProvider(create, [], []);
