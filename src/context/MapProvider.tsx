import { PropsWithChildren, useEffect, useState } from 'react';
import { MapContext, MapState } from '.';

/**
 * MapContext Provider Props
 *
 * @category Context
 */
export interface MapProviderProps {
  store: MapState;
}

/**
 * MapContext Provider
 *
 * @category Context
 *
 * @example
 * - zustand를 사용하는 경우
 * ```tsx
 * export const useMapStore = create<OlMapState>((set, get) => ({
 *   getMap: () => get().map,
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
  const [test, setTest] = useState(store);

  useEffect(() => {
    console.log('=============== MapProvider useEffect ===============');
  }, [test]);
  console.log('=============== MapProvider ===============', store);
  return <MapContext.Provider value={store}>{children}</MapContext.Provider>;
};
