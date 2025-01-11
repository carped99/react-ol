import { Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';

/**
 * Feature의 특정 속성 존재 여부를 확인합니다.
 *
 * @param feature - 확인할 Feature
 * @param property - 확인할 속성 이름
 * @returns 속성 존재 여부
 *
 * @example
 * ```ts
 * if (hasProperty(feature, 'name')) {
 *   console.log(feature.get('name'));
 * }
 * ```
 */
export const hasProperty = (feature: OlFeature<OlGeometry>, property: string): boolean => {
  return Object.prototype.hasOwnProperty.call(feature.getProperties(), property);
};
