import { TRUE } from 'ol/functions.js';
import BaseLayer from 'ol/layer/Base.js';
import LayerGroup from 'ol/layer/Group.js';
import Map from 'ol/Map.js';
import { isLayerGroup } from '../../common';
import { LayerFilter } from '../../Filter/predicate';

/**
 * 주어진 소스(Map 또는 LayerGroup)에서 필터 조건을 만족하는 모든 레이어를 찾아 반환합니다.
 * @param source - Map 또는 LayerGroup 객체
 * @param filter - 레이어 필터링 함수 (기본값: 모든 레이어 포함)
 * @returns 필터 조건을 만족하는 레이어들의 배열
 */
export const findAllLayer = (source: Map | LayerGroup, filter: LayerFilter = TRUE): BaseLayer[] => {
  // 결과를 저장할 배열 초기화
  const result: BaseLayer[] = [];

  // source가 LayerGroup이고 필터 조건을 만족하면 결과에 추가
  if (isLayerGroup(source) && filter(source)) {
    result.push(source);
  }

  // source의 모든 레이어 가져오기
  const layers = source.getLayers().getArray();

  // 각 레이어를 순회하며 검사
  layers.forEach((layer) => {
    if (isLayerGroup(layer)) {
      // LayerGroup인 경우 재귀적으로 하위 레이어 검색
      result.push(...findAllLayer(layer, filter));
    } else if (filter(layer)) {
      // 일반 레이어이고 필터 조건을 만족하면 결과에 추가
      result.push(layer);
    }
  });

  return result;
};
