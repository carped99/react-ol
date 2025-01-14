import { createEmpty, extend, Extent, isEmpty } from 'ol/extent';
import { FeatureOrGeometry, resolveGeometry } from '../../Util/internal';

/**
 * Feature 또는 Geometry에서 전체 영역을 계산합니다.
 *
 * @param source - Feature, Geometry 또는 이들의 배열
 * @returns 입력된 모든 객체를 포함하는 Extent [minX, minY, maxX, maxY]
 *
 * @example
 * ```ts
 * // 단일 `Feature`의 Extent
 * const extent = findExtent(feature);
 *
 * // 여러 `Feature`의 Extent
 * const extent = findExtent([feature1, feature2]);
 *
 * // `Feature`와 Geometry 혼합 배열의 Extent
 * const extent = findExtent([feature1, geometry1, feature2]);
 *```
 */
export const findExtent = (source?: FeatureOrGeometry): Extent | undefined => {
  const geometries = resolveGeometry(source);
  if (geometries.length === 0) {
    return undefined;
  }

  const extent = geometries.reduce((acc, geometry) => {
    const extent = geometry.getExtent();
    return extent ? extend(acc, extent) : acc;
  }, createEmpty());

  return isEmpty(extent) ? undefined : extent;
};
