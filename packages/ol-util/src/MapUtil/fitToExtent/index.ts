import Map from 'ol/Map';
import { FitOptions } from 'ol/View';
import { Extent, isEmpty } from 'ol/extent';

/**
 * 지정된 영역이 지도에 완전히 보이도록 뷰를 조정합니다
 * @param map - OpenLayers Map 인스턴스
 * @param extent - 표시할 영역
 * @param options - fit 옵션
 */
export const fitToExtent = (map: Map, extent: Extent, options?: FitOptions) => {
  if (!isEmpty(extent)) {
    map.getView().fit(extent, options);
  }
};
