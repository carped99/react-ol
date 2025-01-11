import { Coordinate } from 'ol/coordinate';
import Map from 'ol/Map';
import { AnimationOptions } from 'ol/View';

/**
 * 지도의 중심점을 변경합니다.
 * @param map - OpenLayers Map 인스턴스
 * @param coordinate - 새로운 중심 좌표
 * @param options - 애니메이션 옵션
 */
export const setMapCenter = (map: Map, coordinate: Coordinate, options?: Omit<AnimationOptions, 'center'>) => {
  const view = map.getView();
  if (options) {
    view.animate({
      ...options,
      center: coordinate,
    });
  } else {
    view.setCenter(coordinate);
  }
};
