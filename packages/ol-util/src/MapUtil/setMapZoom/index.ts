import Map from 'ol/Map.js';
import { AnimationOptions } from 'ol/View.js';

/**
 * 지도의 줌 레벨을 변경합니다
 * @param map - OpenLayers Map 인스턴스
 * @param zoom - 새로운 줌 레벨
 * @param options - 애니메이션 옵션
 */
export const setMapZoom = (map: Map, zoom: number, options?: Omit<AnimationOptions, 'zoom'>) => {
  const view = map.getView();
  if (options) {
    view.animate({
      ...options,
      zoom: zoom,
    });
  } else {
    view.setZoom(zoom);
  }
};
