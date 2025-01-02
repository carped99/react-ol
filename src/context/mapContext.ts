import { Map } from 'ol';
import { createContext, useContext } from 'react';

/**
 * OpenLayers 맵 상태를 관리하기 위한 인터페이스
 *
 * @category Context
 */
export interface OlMapState {
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
  setMap: (map?: Map) => void;
}

/**
 * 초기 상태
 */
const initialState: OlMapState = {
  getMap: () => {
    throw Error('setMap should be implemented');
  },
  setMap: () => {
    throw Error('setMap should be implemented');
  },
};

/**
 * OpenLayers 맵 상태를 관리하기 위한 React Context
 *
 * @category Context
 */
export const OlMapContext = createContext<OlMapState>(initialState);

/**
 * {@link OlMapContext}를 사용하기 위한 커스텀 훅
 *
 * @category Context
 */
export const useOlMapContext = () => {
  const context = useContext(OlMapContext);
  if (!context) {
    throw new Error('useOlMapContext must be used within a OlMapProvider');
  }
  return context;
};

/**
 * {@link OlMapContext}에 설정된 맵 인스턴스를 반환하는 훅
 *
 * @example
 * ```tsx
 * const { getMap } = useOlMapContext();
 * const map = getMap();
 * ```
 *
 * @category Context
 */
export const useOlMapValue = () => {
  return useOlMapContext().getMap();
};
