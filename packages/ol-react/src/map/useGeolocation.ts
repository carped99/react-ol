import Geolocation, { Options } from 'ol/Geolocation.js';
import { createInstanceProviderByKey, useInstance } from '../base';
import { useEvents } from '../events';
import { GeolocationEvents } from './events';

export interface GeolocationOptions extends Options, GeolocationEvents {}

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link GeolocationEvents} 지도 옵션
 * @category Base
 */
export const useGeolocation = (options: GeolocationOptions = {}) => {
  const instance = useInstance(provider, options);

  useEvents(instance, options);

  return instance;
};

const create = (options: GeolocationOptions) => {
  return new Geolocation(options);
};

const instanceProperties = [
  { name: 'tracking', settable: true },
  { name: 'trackingOptions', settable: true },
  { name: 'projection', settable: true },
] as const;

const provider = createInstanceProviderByKey(create, instanceProperties);
