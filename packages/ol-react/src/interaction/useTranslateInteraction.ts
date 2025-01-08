import { Translate } from 'ol/interaction';
import { Options } from 'ol/interaction/Translate';
import { useInteraction } from './useInteraction';
import { TranslateInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/InstanceProviderByProperties';

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
  events?: TranslateInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: TranslateInteractionOptions) => new Translate(options);

const instanceProperties = [
  { name: 'condition', settable: false },
  { name: 'features', settable: false },
  { name: 'layers', settable: false },
  { name: 'filter', settable: false },
  { name: 'hitTolerance', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
