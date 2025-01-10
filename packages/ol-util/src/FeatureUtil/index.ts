import * as basic from './basic';
import * as properties from './properties';
import { Feature as OlFeature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
import { Extent } from 'ol/extent';
import { cloneFeature, getFeatureCenter, getFeatureExtent } from './Impl';
import { Coordinate } from 'ol/coordinate';

interface FeatureApi {
  /**
   * Feature 또는 Feature 배열의 전체 영역(Extent)을 계산합니다.
   *
   * @param feature - 단일 Feature 또는 Feature 배열
   * @returns [minX, minY, maxX, maxY] 형태의 영역 좌표
   *
   * @example
   * ```typescript
   * // 단일 `Feature`의 영역
   * const extent = getFeatureExtent(feature);
   *
   * // 여러 `Feature`의 전체 영역
   * const features = [feature1, feature2, feature3];
   * const totalExtent = getFeatureExtent(features);
   * ```
   *
   * @remarks
   * - 빈 Feature나 Geometry가 없는 Feature의 경우 빈 Extent([Infinity, Infinity, -Infinity, -Infinity])를 반환
   * - 여러 Feature의 경우 모든 Feature를 포함하는 최소 영역을 계산
   */
  getFeatureExtent(feature: OlFeature | OlFeature[]): Extent;

  /**
   * Feature의 중심 좌표를 계산합니다.
   *
   * @param feature - 중심 좌표를 계산할 OpenLayers Feature
   * @returns Feature의 extent 중심 좌표
   * @throws {Error} Feature에 geometry가 없는 경우
   *
   * @example
   * ```typescript
   * const center = getFeatureCenter(feature);
   * map.getView().setCenter(center);
   * ```
   */
  getFeatureCenter(feature: OlFeature): Coordinate;

  cloneFeature<T extends OlGeometry>(feature: OlFeature<T>, options?: { deep?: boolean }): OlFeature<T>;
}

export * from './typeGuards';
export const FeatureUtil: FeatureApi & typeof basic & typeof properties = {
  ...basic,
  ...properties,
  getFeatureExtent,
  getFeatureCenter,
  cloneFeature,
};
