import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import { byType } from '../basic';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorImageLayer from 'ol/layer/VectorImage';
import TileLayer from 'ol/layer/Tile';

export * from './byFeature';

/**
 * 자주 사용되는 레이어 필터 모음
 */
export const LayerFilters = {
  byVisible: (visible: boolean) => (layer: BaseLayer) => layer.getVisible() === visible,
  isVector: () => (layer: BaseLayer) => byType(VectorLayer)(layer),
  isVectorTile: () => (layer: BaseLayer) => byType(VectorTileLayer)(layer),
  isVectorImage: () => (layer: BaseLayer) => byType(VectorImageLayer)(layer),
  isTile: () => (layer: BaseLayer) => byType(TileLayer)(layer),
} as const;
