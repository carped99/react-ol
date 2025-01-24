import { DebounceOptions, useDebounce } from '../utils/useDebounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapContext } from '../context';
import { Map } from 'ol';
import { unByKey } from 'ol/Observable';

interface ViewportState {
  center: number[];
  zoom: number;
  rotation: number;
  extent: number[];
}

interface ViewportOptions extends DebounceOptions {
  tolerance?: number;
}

/**
 * 지도의 뷰포트(중심점, 줌, 회전) 변경을 감지하고 현재 상태를 반환하는 훅
 *
 * @param options - 뷰포트 감지 옵션
 *
 * @returns 현재 뷰포트 상태
 */
export const useViewportState = (options: ViewportOptions = {}) => {
  const { tolerance = 0.000001 } = options;
  const [viewportState, setViewportState] = useState<ViewportState>();
  const prevState = useRef<ViewportState>();
  const { map } = useMapContext();

  const handleChange = useCallback(() => {
    if (!map || !map.getView()) {
      setViewportState(undefined);
      prevState.current = undefined;
      return;
    }

    const currentState = getViewportState(map);
    if (hasViewportChanged(currentState, prevState.current, tolerance)) {
      prevState.current = currentState;
      setViewportState(currentState);
    }
  }, [map, tolerance]);

  const debounce = useDebounce(() => handleChange(), {
    delay: options.delay,
    leading: options.leading,
    maxWait: options.maxWait,
  });

  useEffect(() => {
    if (!map) return;

    const view = map.getView();
    if (!view) return;

    const eventKeys = [
      view.on('change:center', debounce),
      view.on('change:resolution', debounce),
      view.on('change:rotation', debounce),
      map.on('moveend', debounce),
    ];

    return () => {
      unByKey(eventKeys);
      prevState.current = undefined;
    };
  }, [debounce, handleChange, map]);

  return viewportState;
};

const getViewportState = (map: Map): ViewportState => {
  const view = map.getView();
  return {
    center: view.getCenter() ?? [],
    zoom: view.getZoom() ?? 0,
    rotation: view.getRotation(),
    extent: view.calculateExtent(map.getSize()),
  };
};

const hasViewportChanged = (current: ViewportState, prev: ViewportState | undefined, tolerance: number) => {
  if (!prev) return true;

  return (
    // 중심점 변경 확인
    Math.abs(current.center[0] - prev.center[0]) > tolerance ||
    Math.abs(current.center[1] - prev.center[1]) > tolerance ||
    // 줌 변경 확인
    Math.abs(current.zoom - prev.zoom) > tolerance ||
    // 회전 변경 확인
    Math.abs(current.rotation - prev.rotation) > tolerance
  );
};
