import { useMemo } from 'react';
import { Select } from 'ol/interaction';
import { Options } from 'ol/interaction/Select';
import { useInteraction } from './useInteraction';
import { SelectInteractionEvents } from './event';
import { useOptions } from '../hooks/useOptions';

const optionKeys: readonly (keyof Options)[] = [
  'multi',
  'style',
  'layers',
  'filter',
  'features',
  'condition',
  'addCondition',
  'removeCondition',
  'toggleCondition',
];

/**
 * Options for the {@link useSelectInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SelectInteractionOptions extends Options {}

/**
 * Interaction for selecting vector features.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Select-Select.html | Select}
 * @category Interaction
 */
export const useSelectInteraction = (
  options?: SelectInteractionOptions,
  observable?: SelectInteractionEvents<Select>,
  active = true,
): Select => {
  const opts = useOptions(options ?? {}, optionKeys, true);

  const interaction = useMemo(() => {
    return new Select(opts);
  }, [opts]);

  useInteraction(interaction, observable, active);

  return interaction;
};
