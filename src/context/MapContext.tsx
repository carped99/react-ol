import { createContext, PropsWithChildren, use, useCallback, useMemo, useState } from 'react';
import { Map } from 'ol';

interface MapState {
  map?: Map;
}

interface MapDispatch {
  setMap: (map?: Map) => void;
}

// 4. 초기값 설정
const initialState: MapState = {
  map: undefined,
};

const MapStateContext = createContext<MapState>(initialState);

const MapDispatchContext = createContext<MapDispatch>({
  setMap: () => {
    console.error('setMap is not defined');
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const useMapContext = () => use(MapStateContext);

// eslint-disable-next-line react-refresh/only-export-components
export const useMapDispatch = () => use(MapDispatchContext);

// 6. Provider 컴포넌트
export const MapProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<MapState>(initialState);

  const setMap = useCallback((map?: Map) => {
    setState((prev) => {
      // 이전 상태의 map과 새로운 map을 비교
      if (prev.map !== map) {
        console.log('=============================setMap', map);
        // 새로운 map을 상태에 설정
        return { ...prev, map };
      }
      // 상태가 변경되지 않으면 이전 상태를 반환
      return prev;
    });
  }, []);

  const dispatchValue = useMemo(() => {
    return {
      setMap,
    };
  }, [setMap]);

  return (
    <MapStateContext value={state}>
      <MapDispatchContext value={dispatchValue}>{children}</MapDispatchContext>
    </MapStateContext>
  );
};
