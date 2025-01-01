import TileLayer from 'ol/layer/Tile';
import Observable from 'ol/Observable';
import VectorLayer from 'ol/layer/Vector';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorTileLayer from 'ol/layer/VectorTile';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import ImageLayer from 'ol/layer/Image';
import { OlVectorTileLayerEvents } from '@src/layer/event/OlVectorTileLayerEvents';
import { OlVectorLayerEvents } from '@src/layer/event/OlVectorLayerEvents';
import { OlVectorImageLayerEvents } from '@src/layer/event/OlVectorImageLayerEvents';
import { OlWebGLTileLayerEvents } from '@src/layer/event/OlWebGLTileLayerEvents';
import { OlImageLayerEvents } from '@src/layer/event/OlImageLayerEvents';

/**
 * 레이어에 등록가능한 이벤트
 *
 * @internal
 * @category Event
 */
// @formatter:off
// prettier-ignore
export type LayerObservable<T extends Observable> =
  T extends TileLayer<any> ? OlVectorTileLayerEvents<T> :
  T extends VectorLayer<any> ? OlVectorLayerEvents<T> :
  T extends VectorImageLayer<any> ? OlVectorImageLayerEvents<T> :
  T extends VectorTileLayer<any> ? OlVectorTileLayerEvents<T> :
  T extends WebGLTileLayer ? OlWebGLTileLayerEvents<T> :
  T extends ImageLayer<any> ? OlImageLayerEvents<T> :
  never;
// @formatter:on
