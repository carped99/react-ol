import { MapState } from './mapContext';
import { Map } from 'ol';
import { createStore, StoreApi, UseBoundStore } from 'zustand';
import { useCallback, useEffect, useState } from 'react';

/**
 * `React`를 사용한 Store 생성
 *
 * @category Context
 */
export const useReactMapStore = (): MapState => {
  const [map, setMap] = useState<Map | undefined>();

  useEffect(() => {
    console.log('=============== useReactMapStore ===============', map);
  }, [map]);

  // 상태와 관련된 함수들을 메모이제이션하여 성능 최적화
  return {
    getMap: useCallback(() => map, [map]),
    setMap,
  };
};

/**
 * `Zustand`를 사용한 Store 생성
 *
 * @category Context
 */
export interface ZustandMapState {
  store: UseBoundStore<
    StoreApi<{
      map?: Map;
      setMap: (map: Map | undefined) => void;
    }>
  >;
}

/**
 * `Zustand`를 사용한 Store 생성
 *
 * @category Context
 * @example
 * ```tsx
 * const store =  createZustandMapStore();
 *
 * const App = () => {
 *  ...
 *  return <MapProvider store={store}>...</MapProvider>;
 * }
 * ```
 */
export function createZustandMapStore(): MapState {
  const store = createStore<{
    map?: Map;
    setMap: (map: Map | undefined) => void;
  }>((set) => ({
    map: undefined,
    setMap: (map: Map | undefined) => set({ map }),
  }));

  return {
    getMap: () => store.getState().map,
    setMap: (map: Map | undefined) => store.getState().setMap(map),
  };
}

//
// export interface RecoilMapState {
//   useMapState: () => { map: Map | undefined; setMap: (map: Map | undefined) => void };
//   getMap: () => Map | undefined;
//   setMap: (map: Map | undefined) => void;
//   store: RecoilState<Map | undefined>;
// }
//
// export function createRecoilMapStore(key: string = 'MapStore'): MapState<RecoilMapState> {
//   const store = atom<Map | undefined>({
//     key,
//     default: undefined,
//   });
//
//   // This hook is used inside React components
//   const useMapState = () => {
//     const [map, setMap] = useRecoilState(store);
//     return { map, setMap };
//   };
//
//   // Non-hook functions for getMap and setMap, used outside React components
//   let cachedMap: Map | undefined;
//   const setCachedMap = (map: Map | undefined) => {
//     cachedMap = map;
//   };
//
//   return {
//     useMapState,
//     getMap: () => cachedMap,
//     setMap: (map: Map | undefined) => {
//       setCachedMap(map);
//     },
//     store,
//   };
// }
//
// /**
//  * Jotai 기반 Map 상태 관리를 위한 Store 생성
//  * @returns MapState 객체
//  */
// export function createJotaiMapStore(): MapState {
//   // Jotai atom 정의
//   const mapAtom = jotaiAtom<Map | undefined>(undefined);
//
//   // React 컴포넌트에서 사용하는 Hook
//   const useMapState = () => {
//     const [map, setMap] = useAtom(mapAtom);
//     return { map, setMap };
//   };
//
//   const getMap = (): Map | undefined => {
//     const [value] = useAtom(mapAtom);
//     return value;
//   };
//
//   const setMap = (map: Map | undefined): void => {
//     mapAtom.write(map);
//   };
//
//   return {
//     getMap,
//     setMap,
//     atom: mapAtom,
//   };
// }
