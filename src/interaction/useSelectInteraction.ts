import { Select } from 'ol/interaction';
import { Options } from 'ol/interaction/Select';
import { useInteraction } from './useInteraction';
import { SelectInteractionEvents } from './event';
import { useBaseObject } from '../hooks/useBaseObject';

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
  events?: SelectInteractionEvents<Select>,
  active = true,
): Select => {
  const interaction = useBaseObject(options, create, createKeys, []);

  useInteraction(interaction, events, active);

  return interaction;
};

const create = (options?: Options) => new Select(options);

const createKeys = [
  'multi',
  'style',
  'layers',
  'filter',
  'features',
  'condition',
  'addCondition',
  'removeCondition',
  'toggleCondition',
] as const;
