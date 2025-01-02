import { useMemo } from 'react';
import { Select } from 'ol/interaction';
import { Options } from 'ol/interaction/Select';
import { useOlInteraction } from './useOlInteraction';
import { useOlOptions } from '@src/hooks/useOlOptions';
import { OlSelectInteractionEvents } from '@src/interaction/event';

/**
 * Options for the {@link useOlSelectInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlSelectInteractionOptions extends Options {}

/**
 * Interaction for selecting vector features.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Select-Select.html | Select}
 * @category Interaction
 */
export const useOlSelectInteraction = (
  options?: OlSelectInteractionOptions,
  observable?: OlSelectInteractionEvents<Select>,
  active = true,
): Select => {
  const opts = useOlOptions(options ?? {}, optionKeys, true);

  const interaction = useMemo(() => {
    return new Select(opts);
  }, [opts]);

  useOlInteraction(interaction, observable, active);

  return interaction;
};

const optionKeys: readonly (keyof Options)[] = <const>[
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
