import { Geolocation } from 'ol';
import { useEvents } from '../events';
import { GeolocationEvents } from './events';
import { GeolocationOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/InstanceProviderByProperties';

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link GeolocationEvents} 지도 옵션
 * @param events - Events for the Map.
 * @category Base
 */
export const useGeolocation = (options: GeolocationOptions = {}, events?: GeolocationEvents) => {
  const instance = useInstance(provider, options);

  useEvents(instance, events);

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
