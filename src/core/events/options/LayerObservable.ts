import TileLayer from 'ol/layer/Tile';
import Observable from 'ol/Observable';
import VectorLayer from 'ol/layer/Vector';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorTileLayer from 'ol/layer/VectorTile';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import ImageLayer from 'ol/layer/Image';
import {
  ImageLayerEvents,
  VectorImageLayerEvents,
  VectorLayerEvents,
  VectorTileLayerEvents,
  WebGLTileLayerEvents,
} from '../../layer/events';

/**
 * 레이어에 등록가능한 이벤트
 *
 * @internal
 * @category Event
 */
// @formatter:off
// prettier-ignore
export type LayerObservable<T extends Observable> =
  T extends TileLayer<any> ? VectorTileLayerEvents :
  T extends VectorLayer<any> ? VectorLayerEvents :
  T extends VectorImageLayer<any> ? VectorImageLayerEvents :
  T extends VectorTileLayer<any> ? VectorTileLayerEvents :
  T extends WebGLTileLayer ? WebGLTileLayerEvents :
  T extends ImageLayer<any> ? ImageLayerEvents :
  never;
// @formatter:on
