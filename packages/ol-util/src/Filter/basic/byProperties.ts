import BaseObject from 'ol/Object';
import { AlwaysTrue } from '../predicate';

/**
 * 객체의 속성값들을 비교하여 필터링하는 함수
 *
 * @param properties - 비교할 속성값 객체
 * @returns 필터 함수
 *
 * @example
 * ```typescript
 * const filter = byProperties({ type: 'feature', visible: true });
 * const result = filter(layer);
 * ```
 */
export const byProperties = (properties: Record<string, unknown>) => {
  // 빈 객체 체크
  if (!properties || Object.keys(properties).length === 0) {
    return AlwaysTrue;
  }

  return (item: BaseObject) => byPropertiesImpl(item, properties);
};

const byPropertiesImpl = (obj: BaseObject, properties: Record<string, unknown>): boolean => {
  const objProps = obj.getProperties();
  return Object.entries(properties).every(
    ([key, value]) => Object.prototype.hasOwnProperty.call(objProps, key) && objProps[key] === value,
  );
};
