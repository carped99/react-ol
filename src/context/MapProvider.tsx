import { PropsWithChildren, useState } from 'react';
import { MapContext, MapState } from '.';
import { Map } from 'ol';

/**
 * MapContext Provider Props
 *
 * @category Context
 */
export interface MapProviderProps {
  store?: MapState;
}

/**
 * MapContext Provider
 *
 * @category Context
 *
 * @example
 * - zustand를 사용하는 경우
 * ```tsx
 * const useMapStore = create<MapState>((set) => ({
 *   map: undefined,
 *   setMap: (map) => set(() => ({ map })),
 * }));
 *
 * const App = () => {
 *   const store = useMapStore();
 *
 *   return (
 *     <MapStateProvider store={store}>
 *       <YourComponent />
 *     </MapStateProvider>
 *   );
 * };
 * ```
 */
export const MapProvider = ({ children, store }: PropsWithChildren<MapProviderProps>) => {
  const defaultStore = useDefaultMapStore();
  store = store ?? defaultStore;
  return <MapContext.Provider value={store}>{children}</MapContext.Provider>;
};

const useDefaultMapStore = (): MapState => {
  const [map, setMap] = useState<Map | undefined>();
  return {
    map,
    setMap,
  };
};
