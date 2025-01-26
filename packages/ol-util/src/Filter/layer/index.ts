import BaseLayer from 'ol/layer/Base.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorImageLayer from 'ol/layer/VectorImage.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import { byType } from '../byType';

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
