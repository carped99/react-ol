import OlFeature from 'ol/Feature.js';
import { Geometry as OlGeometry } from 'ol/geom.js';

/**
 * OpenLayers Feature 객체를 다루기 위한 유틸리티 함수들을 제공합니다.
 * @packageDocumentation
 */
type PropertyValidator = (value: unknown) => boolean;

/**
 * Feature의 속성값이 주어진 스키마에 맞는지 검증합니다.
 *
 * @param feature - 검증할 Feature
 * @param schema - 속성별 검증 함수를 담은 객체
 * @returns 검증 결과
 *
 * @example
 * ```ts
 * const schema = {
 *   name: (value) => typeof value === 'string',
 *   population: (value) => typeof value === 'number' && value >= 0
 * };
 *
 * if (validateFeatureProperties(feature, schema)) {
 *   console.log('Valid feature');
 * }
 * ```
 */
export function validateFeatureProperties(
  feature: OlFeature<OlGeometry>,
  schema: Record<string, PropertyValidator>,
): boolean {
  const properties = feature.getProperties();
  return Object.entries(schema).every(([prop, validate]) => validate(properties[prop]));
}
