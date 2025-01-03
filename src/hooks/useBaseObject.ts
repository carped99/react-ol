import BaseObject from 'ol/Object';
import { useEffect } from 'react';
import { usePrevious } from './usePrevious';
import { compareDeep } from '../utils/common';

export interface BaseObjectOptions {
  properties?: Record<string, unknown>;
}

export const useBaseObject = <T extends BaseObject>(baseObject?: T, options?: BaseObjectOptions) => {
  const properties = usePrevious(options?.properties);

  useEffect(() => {
    if (!compareDeep(properties, options?.properties)) {
      baseObject?.setProperties(options?.properties ?? {}, true);
    }
  }, [baseObject, properties, options?.properties]);
};
