import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import Map from 'ol/Map';
import { isLayerGroup } from '../common';
import { AlwaysTrue } from '../Filter/type';
import { LayerFilter } from '../Filter';

/**
 * 주어진 소스(Map 또는 LayerGroup)에서 필터 조건을 만족하는 모든 레이어를 찾아 반환합니다.
 * @public
 * @param source - Map 또는 LayerGroup 객체
 * @param filter - 레이어 필터링 함수 (기본값: 모든 레이어 포함)
 * @returns 필터 조건을 만족하는 레이어들의 배열
 */
export const findAllLayer = (source: Map | LayerGroup, filter: LayerFilter = AlwaysTrue): BaseLayer[] => {
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

/**
 * 주어진 소스에서 필터 조건을 만족하는 첫 번째 레이어를 찾아 반환합니다.
 * @public
 * @param source - Map 또는 LayerGroup 객체
 * @param filter - 레이어 필터링 함수 (기본값: 모든 레이어 포함)
 * @returns 조건을 만족하는 첫 번째 레이어 또는 undefined
 */
export const findOneLayer = (source: Map | LayerGroup, filter: LayerFilter = AlwaysTrue): BaseLayer | undefined => {
  if (isLayerGroup(source) && filter(source)) {
    return source;
  }

  const layers = source.getLayers().getArray();
  for (const layer of layers) {
    if (filter(layer)) {
      return layer;
    }

    if (isLayerGroup(layer)) {
      const found = findOneLayer(layer, filter); // 재귀적으로 하위 레이어 탐색
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};
//
// /**
//  * 주어진 소스에서 지정된 이름을 가진 모든 레이어를 찾아 반환합니다.
//  * @param source - Map 또는 LayerGroup 객체
//  * @param name - 찾을 레이어 이름
//  * @returns 이름이 일치하는 레이어 배열
//  */
// export const findAllLayerByName = (source: Map | LayerGroup, name: string) => {
//   return findAllLayerByProperty(source, 'name', name);
// };
//
// /**
//  * 주어진 소스에서 지정된 속성값을 가진 모든 레이어를 찾아 반환합니다.
//  * @param source - Map 또는 LayerGroup 객체
//  * @param key - 속성 키
//  * @param value - 속성값
//  * @returns 속성값이 일치하는 레이어 배열
//  */
// export const findAllLayerByProperty = (source: Map | LayerGroup, key: string, value: unknown) => {
//   return findAllLayer(source, (layer) => layer.get(key) === value);
// };
//
// /**
//  * 주어진 소스에서 지정된 이름을 가진 첫 번째 레이어를 찾아 반환합니다.
//  * @param source - Map 또는 LayerGroup 객체
//  * @param name - 찾을 레이어 이름
//  * @returns 이름이 일치하는 첫 번째 레이어 또는 undefined
//  */
// export const findLayerByName = (source: Map | LayerGroup, name: string) => {
//   return findLayerByProperty(source, 'name', name);
// };
//
// /**
//  * 주어진 소스에서 속성값을 가진 첫 번째 레이어를 찾아 반환합니다.
//  * @param source - Map 또는 LayerGroup 객체
//  * @param key - 속성 키
//  * @param value - 속성값
//  * @returns 속성값이 일치하는 첫 번째 레이어 또는 undefined
//  */
// export const findLayerByProperty = (source: Map | LayerGroup, key: string, value: unknown) => {
//   return findLayer(source, (layer) => layer.get(key) === value);
// };
//
// /**
//  * 주어진 소스에서 지정된 `UID`를 가진 레이어를 찾아 반환합니다.
//  * @param source - Map 또는 LayerGroup 객체
//  * @param uid - 찾을 레이어의 UID
//  * @returns `UID`가 일치하는 레이어 또는 undefined
//  */
// export const findLayerByUid = (source: Map | LayerGroup, uid: ReturnType<typeof getUid>) => {
//   return findLayer(source, (layer) => uid === getUid(layer));
// };
//
// /**
//  * 주어진 소스에서 지정된 이름을 가진 첫 번째 레이어 그룹을 찾아 반환합니다.
//  * @param source - Map 또는 LayerGroup 객체
//  * @param name - 레이어 그룹 이름
//  */
// export const findLayerGroupByName = (source: Map | LayerGroup, name: string) => {
//   return findLayer(source, (layer) => isLayerGroup(layer) && layer.get('name') === name) as LayerGroup | undefined;
// };
//
// /**
//  * 주어진 `Feature`를 포함하고 있는 레이어를 찾아 반환합니다.
//  *
//  * @param source - Map 또는 LayerGroup 객체
//  * @param feature - 찾고자 하는 Feature 객체
//  * @returns `Feature`를 포함하고 있는 레이어 또는 undefined
//  *
//  * @example
//  * ```ts
//  * const selectedFeature = // ... some feature
//  * const containingLayer = findLayerByFeature(map, selectedFeature);
//  * if (containingLayer) {
//  *   // Feature를 포함하는 레이어를 찾은 경우의 처리
//  * }
//  * ```
//  */
// export const findLayerByFeature = (source: Map | LayerGroup, feature: Feature) => {
//   return findLayer(source, (layer) => {
//     return (layer as any).getSource?.()?.hasFeature?.(feature) ?? false;
//   });
// };
//
// /**
//  * 지도에서 특정 Feature를 포함하는 레이어를 찾습니다
//  * @param map - OpenLayers Map 인스턴스
//  * @param uid - Feature internal unique identifier
//  */
// export const findLayerByFeatureUid = (map: Map, uid: string) => {
//   return findLayer(map, (layer) => {
//     return (layer as any).getSource?.()?.getFeatureByUid?.() === uid;
//   });
// };
