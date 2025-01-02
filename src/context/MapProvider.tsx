import { PropsWithChildren, useMemo, useState } from 'react';
import { Map } from 'ol';
import { OlMapContext, OlMapState } from '@src/context/mapContext';

/**
 * MapContext Provider Props
 *
 * @category Context
 */
export interface OlMapProviderProps {
  store?: OlMapState;
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
export const OlMapProvider = ({ children, store }: PropsWithChildren<OlMapProviderProps>) => {
  const defaultStore = useDefaultMapProviderState();
  const value = store ?? defaultStore;
  return <OlMapContext.Provider value={value}>{children}</OlMapContext.Provider>;
};

// 기본 store를 생성하는 훅
const useDefaultMapProviderState = (): OlMapState => {
  const [map, setMap] = useState<Map | undefined>();

  // 상태와 관련된 함수들을 메모이제이션하여 성능 최적화
  return useMemo(
    () => ({
      getMap: () => map,
      setMap,
    }),
    [map],
  );
};
