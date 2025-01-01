import { useMemo } from 'react';
import { Translate } from 'ol/interaction';
import { Options } from 'ol/interaction/Translate';
import { useOlInteraction } from './useOlInteraction';

/**
 * Interaction for translating (moving) features.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options} for the interaction.
 *
 * @category Interaction
 */
export const useOlTranslateInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Translate => {
  const translate = useMemo(() => new Translate(options), [options]);

  useOlInteraction(translate, active);

  return translate;
};
