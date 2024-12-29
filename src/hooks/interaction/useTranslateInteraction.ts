import { useMemo } from 'react';
import { Translate } from 'ol/interaction';
import { Options as TranslateOptions } from 'ol/interaction/Translate';
import { useInteraction } from '@src/hooks/interaction/useInteraction';

export const useTranslateInteraction = ({
  active = true,
  translateOptions,
}: {
  active?: boolean;
  translateOptions?: TranslateOptions;
}) => {
  const translate = useMemo(() => new Translate(translateOptions), [translateOptions]);

  useInteraction(translate, active);

  return translate;
};
