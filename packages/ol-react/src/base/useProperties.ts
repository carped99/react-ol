import BaseObject from 'ol/Object.js';
import { useEffect } from 'react';
import { equalsDeep } from '../utils';
import { usePrevious } from './usePrevious';

export interface BaseObjectOptions {
  properties?: Record<string, unknown>;
}

export const useProperties = <T extends BaseObject>(baseObject?: T, options?: BaseObjectOptions) => {
  const properties = usePrevious(options?.properties);

  useEffect(() => {
    if (!equalsDeep(properties, options?.properties)) {
      baseObject?.setProperties(options?.properties ?? {}, true);
    }
  }, [baseObject, properties, options?.properties]);
};
