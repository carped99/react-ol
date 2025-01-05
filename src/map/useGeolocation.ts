import { Geolocation } from 'ol';

import { useBaseObject } from '../hooks/useBaseObject';
import { useEvents } from '../events';
import { GeolocationEvents } from './events';
import { GeolocationOptions } from './options';

/**
 * 지도를 생성하고 반환한다.
 * @param options - {@link GeolocationEvents} 지도 옵션
 * @param events - Events for the Map.
 * @category Base
 */
export const useGeolocation = (options: GeolocationOptions = {}, events?: GeolocationEvents<Geolocation>) => {
  const geoLocation = useBaseObject(options, create, createKeys, updateKeys);

  useEvents(geoLocation, events);

  return geoLocation;
};

const create = (options?: GeolocationOptions) => {
  return new Geolocation(options);
};

const createKeys = [] as const;
const updateKeys = ['tracking', 'trackingOptions', 'projection'] as const;
