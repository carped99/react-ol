import BaseObject from 'ol/Object';
import { useEffect } from 'react';
import { usePrevious } from './usePrevious';
import { equalsDeep } from '../utils';

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
