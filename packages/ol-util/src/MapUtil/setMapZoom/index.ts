import Map from 'ol/Map.js';
import { AnimationOptions } from 'ol/View.js';

/**
 * 지도의 줌 레벨을 변경합니다
 * @param map - OpenLayers Map 인스턴스
 * @param zoom - 새로운 줌 레벨
 * @param options - 애니메이션 옵션
 */
export const setMapZoom = (map: Map, zoom: number, options?: Omit<AnimationOptions, 'zoom' | 'resolution'>) => {
  const view = map.getView();
  const constrainedZoom = view.getConstrainedZoom(zoom);
  if (constrainedZoom == null) return;

  if (view.getAnimating()) {
    view.cancelAnimations();
  }

  if (options) {
    view.animate({
      ...options,
      zoom: constrainedZoom,
    });
  } else {
    view.setZoom(constrainedZoom);
  }
};

/**
 * 지도의 줌 레벨을 변경합니다
 * @param map - OpenLayers Map 인스턴스
 * @param zoomDelta - 변경할 줌 레벨
 * @param options - 애니메이션 옵션
 */
export const setMapZoomBy = (map: Map, zoomDelta: number, options?: Omit<AnimationOptions, 'zoom' | 'resolution'>) => {
  const view = map.getView();
  setMapZoom(map, (view.getZoom() ?? 0) + zoomDelta, options);
};
