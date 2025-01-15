import BaseLayer from 'ol/layer/Base';
import { Geometry } from 'ol/geom';
import { Feature } from 'ol';

export type Predicate<T> = (value: T) => boolean;

/**
 * 레이어 필터링을 위한 콜백 함수 타입
 *
 * @typeParam T - 레이어 타입 (기본값: BaseLayer)
 * @param layer - 필터링할 레이어
 * @returns 필터 조건에 맞으면 true, 아니면 false
 *
 * @example
 * ```ts
 * // 보이는 레이어만 필터링
 * const visibleFilter: LayerFilter = layer => layer.getVisible();
 *
 * // 특정 타입의 레이어만 필터링
 * const vectorFilter: LayerFilter<VectorLayer> = layer => layer instanceof VectorLayer;
 * ```
 *
 * @public
 */
export type LayerFilter<T extends BaseLayer = BaseLayer> = Predicate<T>;

export type FeatureFilter<T extends Geometry = Geometry> = Predicate<Feature<T>>;
