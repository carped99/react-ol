import { Select } from 'ol/interaction';
import { Options } from 'ol/interaction/Select';
import { useInteraction } from './useInteraction';
import { SelectInteractionEvents } from './event';
import { createInstanceProviderByKey, useInstance } from '../base';

/**
 * Options for the - {@link useSelectInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SelectInteractionOptions extends Options {}

/**
 * Interaction for selecting vector features.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Select-Select.html | Select}
 * @category Interaction
 */
export const useSelectInteraction = (
  options: SelectInteractionOptions = {},
  events?: SelectInteractionEvents,
  active = true,
): Select => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new Select(options);

const instanceProperties = [
  { name: 'addCondition', settable: false },
  { name: 'condition', settable: false },
  { name: 'layers', settable: false },
  { name: 'style', settable: false },
  { name: 'removeCondition', settable: false },
  { name: 'toggleCondition', settable: false },
  { name: 'multi', settable: false },
  { name: 'features', settable: false },
  { name: 'filter', settable: false },
  { name: 'hitTolerance', settable: true },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
