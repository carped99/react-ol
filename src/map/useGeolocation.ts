import { Geolocation } from 'ol';
import { useEvents } from '../events';
import { GeolocationEvents } from './events';
import { GeolocationOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link GeolocationEvents} 지도 옵션
 * @param events - Events for the Map.
 * @category Base
 */
export const useGeolocation = (options: GeolocationOptions = {}, events?: GeolocationEvents<Geolocation>) => {
  const instance = useInstance(provider, options);

  useEvents(instance, events);

  return instance;
};

const create = (options?: GeolocationOptions) => {
  return new Geolocation(options);
};

const createKeys = [] as const;
const updateKeys = ['tracking', 'trackingOptions', 'projection'] as const;
const provider = createBaseObjectProvider(create, createKeys, updateKeys);
