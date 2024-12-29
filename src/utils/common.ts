import { Interaction } from 'ol/interaction';
import { Class } from '@src/types/common';
import { Map } from 'ol';

/**
 * 지도에서 특정 {@link Interaction}을 찾는다.
 * @param map 지도
 * @param clazz 찾을 {@link Interaction} 클래스
 */
export function findInteraction(map: Map, clazz: Class<Interaction>) {
  return map
    .getInteractions()
    .getArray()
    .find((it) => it instanceof clazz);
}
