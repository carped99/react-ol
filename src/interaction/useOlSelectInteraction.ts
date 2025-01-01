import { useMemo } from 'react';
import { Select } from 'ol/interaction';
import { Options } from 'ol/interaction/Select';
import { useOlInteraction } from './useOlInteraction';
import { useOlOptions } from '@src/hooks/useOlOptions';

/**
 * @expand
 */
export type SelectInteractionOptions = Options & {
  active?: boolean;
};

/**
 * Interaction for selecting vector features.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options} for the interaction.
 *
 * @category Interaction
 */
export const useOlSelectInteraction = (options?: SelectInteractionOptions, active = true): Select => {
  const opts = useOlOptions(options ?? {}, optionKeys, true);

  const interaction = useMemo(() => {
    return new Select(opts);
  }, [opts]);

  useOlInteraction(interaction, active);

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

// export const useSelectInteractionOptions = (options: Options) => {
//   const valueRef = useRef(options);
//   deepEqual(options.toggleCondition, options.toggleCondition);
//   return useOlOptions(options, ['hitTolerance']);
// };
