import { useMapContext } from '../context';
import { useCallback, useEffect, useRef } from 'react';
import { Map } from 'ol';
import { unByKey } from 'ol/Observable';
import { DebounceOptions, useDebounce } from '../utils/useDebounce';

interface ViewportState {
  center: number[];
  zoom: number;
  rotation: number;
  extent: number[];
}

interface ViewportOptions extends DebounceOptions {
  tolerance: number;
}

export const useViewportChange = (
  callback: (event: ViewportState) => void,
  options: ViewportOptions = {
    delay: 300,
    tolerance: 0.00001,
  },
) => {
  const prevState = useRef<ViewportState>(undefined);
  const { map } = useMapContext();

  const handleViewportChange = useCallback(() => {
    if (!map) return;
    const currentState = getViewportState(map);
    if (hasViewportChanged(currentState, prevState.current, options.tolerance)) {
      prevState.current = currentState;
      callback(currentState);
    }
  }, [map, callback, options.tolerance]);

  const debounce = useDebounce(() => handleViewportChange(), { delay: options.delay });

  useEffect(() => {
    if (!map) return;

    const view = map.getView();

    const eventKeys = [
      view.on('change:center', debounce),
      view.on('change:resolution', debounce),
      view.on('change:rotation', debounce),
      map.on('moveend', debounce),
    ];

    debounce();

    return () => {
      unByKey(eventKeys);
    };
  }, [debounce, handleViewportChange, map]);
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
