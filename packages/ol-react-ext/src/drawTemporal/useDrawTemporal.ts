import { useMapContext } from '@carped99/ol-react';
import { drawTemporal, DrawTemporalCallback, DrawTemporalConfig, DrawTemporalLayer } from '@carped99/ol-util';
import { useCallback, useEffect, useRef } from 'react';

export const useDrawTemporal = () => {
  const { map } = useMapContext();
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  // 정리 함수
  const cleanup = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = undefined;
    }
  }, []);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return useCallback(
    (layer: DrawTemporalLayer, callback: DrawTemporalCallback, config: DrawTemporalConfig) => {
      if (!map) return;

      // 이전 작업 정리
      cleanup();

      // 새 작업 시작
      cleanupRef.current = drawTemporal(map, layer, callback, config);

      // 정리 함수 반환
      return cleanup;
    },
    [map, cleanup],
  );
};
