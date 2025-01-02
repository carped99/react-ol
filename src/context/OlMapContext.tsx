import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { Map } from 'ol';

interface OlMapState {
  map?: Map;
}

interface OlMapDispatch {
  setMap: (map?: Map) => void;
}

// 4. 초기값 설정
const initialState: OlMapState = {
  map: undefined,
};

const OlMapStateContext = createContext<OlMapState>(initialState);

const OlMapDispatchContext = createContext<OlMapDispatch>({
  setMap: () => {
    console.error('setMap is not defined');
  },
});

/**
 * MapContext
 *
 * @category Context
 */
export const useOlMapContext = () => useContext(OlMapStateContext);

/**
 * MapContext
 *
 * @category Context
 */
export const useOlMapDispatch = () => useContext(OlMapDispatchContext);

/**
 * MapContext Provider
 *
 * @category Context
 */
export const OlMapProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<OlMapState>(initialState);

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
    <OlMapStateContext.Provider value={state}>
      <OlMapDispatchContext.Provider value={dispatchValue}>{children}</OlMapDispatchContext.Provider>
    </OlMapStateContext.Provider>
  );
};
