import { useMemo } from 'react';
import { Translate } from 'ol/interaction';
import { Options } from 'ol/interaction/Translate';
import { useInteraction } from './useInteraction';

/**
 * Interaction for translating (moving) features.
 * @param active Whether the interaction should be active.
 * @param options {@link Options} for the interaction.
 * @return {@link Translate}
 */
export const useTranslateInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Translate => {
  const translate = useMemo(() => new Translate(options), [options]);

  useInteraction(translate, active);

  return translate;
};
