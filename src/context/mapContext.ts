import { Map } from 'ol';
import { createContext, useContext } from 'react';

/**
 * OpenLayers 맵 상태를 관리하기 위한 인터페이스
 *
 * @category Context
 */
export type MapState<T = object> = {
  // 추상화된 상태 관리를 위해 함수로 정의

  /**
   * 현재 맵 인스턴스를 반환하는 함수
   * @returns 현재 맵 인스턴스 또는 undefined
   */
  getMap: () => Map | undefined;

  /**
   * 맵 인스턴스를 설정하는 함수
   * @param map - 설정할 맵 인스턴스
   */
  setMap: (map: Map | undefined) => void;
} & T;

/**
 * OpenLayers 맵 상태를 관리하기 위한 React Context
 *
 * @category Context
 */
export const MapContext = createContext<MapState | undefined>(undefined);

/**
 * {@link MapContext}를 사용하기 위한 커스텀 훅
 *
 * @category Context
 */
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};

/**
 * {@link MapContext}에 설정된 맵 인스턴스를 반환하는 훅
 *
 * @example
 * ```tsx
 * const { getMap } = useMapContext();
 * const map = getMap();
 * ```
 *
 * @category Context
 */
export const useMapValue = () => {
  return useMapContext().getMap();
};
