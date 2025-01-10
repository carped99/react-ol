import { Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';

/**
 * Feature의 모든 속성을 제거합니다.
 *
 * @param feature - 속성을 제거할 Feature
 * @param exclude - 제거하지 않을 속성 이름 배열
 *
 * @example
 * ```typescript
 * // 모든 속성 제거
 * clearProperties(feature);
 *
 * // id 속성은 유지하고 나머지 제거
 * clearProperties(feature, ['id']);
 * ```
 */
export const clearProperties = (feature: OlFeature<OlGeometry>, exclude: readonly string[] = []) => {
  const geometry = feature.getGeometry();

  // 제외할 프로퍼티를 유지하며 나머지는 제거
  const preservedProps = Object.fromEntries(
    exclude.map((prop) => [prop, feature.get(prop)]).filter(([, value]) => value !== undefined),
  );

  feature.setProperties(preservedProps);
  if (geometry) {
    feature.setGeometry(geometry); // 지오메트리를 다시 설정
  }
};
