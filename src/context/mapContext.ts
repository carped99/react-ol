import { Map } from 'ol';
import { createContext, useContext } from 'react';

/**
 * OpenLayers 맵 상태를 관리하기 위한 인터페이스
 *
 * @category Context
 */
export type MapState<T = object> = {
  map?: Map;
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
