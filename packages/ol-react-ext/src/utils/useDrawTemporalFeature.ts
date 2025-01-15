import { Feature } from 'ol';
import { Style } from 'ol/style';
import { useMapContext } from '@carped99/ol-react';
import { drawTemporalFeature, DrawTemporalFeatureLayer, DrawTemporalFeatureStyle } from '@carped99/ol-util';
import { useCallback, useEffect, useRef } from 'react';

export const useDrawTemporalFeature = () => {
  const { map } = useMapContext();
  // 현재 실행 중인 cleanup 함수 참조
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

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
    <F extends Feature = Feature>(
      layer: DrawTemporalFeatureLayer,
      features: F[],
      style: DrawTemporalFeatureStyle<F> | Style,
      duration: number,
    ) => {
      if (!map) return;

      cleanup();

      cleanupRef.current = drawTemporalFeature(map, layer, features, style, duration);
    },
    [map, cleanup],
  );
};
