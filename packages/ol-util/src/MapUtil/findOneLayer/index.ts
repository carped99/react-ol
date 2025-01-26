import { TRUE } from 'ol/functions.js';
import BaseLayer from 'ol/layer/Base.js';
import LayerGroup from 'ol/layer/Group.js';
import Map from 'ol/Map.js';
import { isLayerGroup } from '../../common';
import { LayerFilter } from '../../Filter/predicate';

/**
 * 주어진 소스에서 필터 조건을 만족하는 첫 번째 레이어를 찾아 반환합니다.
 * @param source - Map 또는 LayerGroup 객체
 * @param filter - 레이어 필터링 함수 (기본값: 모든 레이어 포함)
 * @returns 조건을 만족하는 첫 번째 레이어 또는 undefined
 */
export const findOneLayer = (source: Map | LayerGroup, filter: LayerFilter = TRUE): BaseLayer | undefined => {
  // source가 LayerGroup이고 필터 조건을 만족하면 바로 반환
  if (isLayerGroup(source) && filter(source)) {
    return source;
  }

  // source의 모든 레이어 가져오기
  const layers = source.getLayers().getArray();

  // 각 레이어를 순회하며 검사
  for (const layer of layers) {
    if (isLayerGroup(layer)) {
      const found = findOneLayer(layer, filter); // 재귀적으로 하위 레이어 탐색
      if (found) {
        return found;
      }
    } else if (filter(layer)) {
      return layer;
    }
  }
  return undefined;
};
