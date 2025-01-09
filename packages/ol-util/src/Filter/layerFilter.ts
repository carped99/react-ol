import BaseLayer from 'ol/layer/Base';
import { byType, Predicate } from '../Filter';
import { commonFilters } from '../Filter/type';
import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorImageLayer from 'ol/layer/VectorImage';
import TileLayer from 'ol/layer/Tile';
import { Feature } from 'ol';

/**
 * 레이어 필터링을 위한 콜백 함수 타입
 *
 * @typeParam T - 레이어 타입 (기본값: BaseLayer)
 * @param layer - 필터링할 레이어
 * @returns 필터 조건에 맞으면 true, 아니면 false
 *
 * @example
 * ```typescript
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

/**
 * @alpha
 * @param feature
 */
export const byFeature = (feature: Feature) => (layer: BaseLayer) =>
  (layer as any).getSource?.()?.hasFeature?.(feature) ?? false;

/**
 * 자주 사용되는 레이어 필터 모음
 */
export const LayerFilters = {
  ...commonFilters,
  byVisible: (visible: boolean) => (layer: BaseLayer) => layer.getVisible() === visible,
  isVector: () => (layer: BaseLayer) => byType(VectorLayer)(layer),
  isVectorTile: () => (layer: BaseLayer) => byType(VectorTileLayer)(layer),
  isVectorImage: () => (layer: BaseLayer) => byType(VectorImageLayer)(layer),
  isTile: () => (layer: BaseLayer) => byType(TileLayer)(layer),
} as const;
