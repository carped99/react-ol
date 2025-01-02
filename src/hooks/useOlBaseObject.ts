import BaseObject from 'ol/Object';
import { useEffect } from 'react';
import { usePrevious } from '@src/hooks/usePrevious';
import { compareDeep } from '@src/utils/common';

export interface OlBaseObjectOptions {
  properties?: Record<string, unknown>;
}

export const useOlBaseObject = <T extends BaseObject>(baseObject?: T, options?: OlBaseObjectOptions) => {
  const properties = usePrevious(options?.properties);

  useEffect(() => {
    if (!compareDeep(properties, options?.properties)) {
      baseObject?.setProperties(options?.properties ?? {}, true);
    }
  }, [baseObject, properties, options?.properties]);
};
