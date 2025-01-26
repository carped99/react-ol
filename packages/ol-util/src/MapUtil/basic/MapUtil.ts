import { TRUE } from 'ol/functions';
import Map from 'ol/Map';
import { LayerFilter } from '../../Filter/predicate';
import { findAllLayer } from '../findAllLayer';

/**
 * 지도의 모든 레이어를 활성화/비활성화합니다
 * @param map - OpenLayers Map 인스턴스
 * @param visible - 표시 여부
 * @param filter - 레이어 필터링 조건 함수
 */
export const setLayerVisible = (map: Map, visible: boolean, filter: LayerFilter = TRUE) => {
  findAllLayer(map, filter).forEach((layer) => layer.setVisible(visible));
};

/**
 * 지도의 현재 상태를 반환합니다
 * @param map - OpenLayers Map 인스턴스
 */
export const getMapState = (map: Map) => {
  const view = map.getView();
  return {
    center: view.getCenter(),
    zoom: view.getZoom(),
    rotation: view.getRotation(),
    extent: view.calculateExtent(map.getSize()),
  };
};
