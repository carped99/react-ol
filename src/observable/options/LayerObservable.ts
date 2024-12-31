import TileLayer from 'ol/layer/Tile';
import Observable from 'ol/Observable';
import VectorLayer from 'ol/layer/Vector';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorTileLayer from 'ol/layer/VectorTile';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import ImageLayer from 'ol/layer/Image';
import { VectorTileLayerEvents } from '@src/layer/event/VectorTileLayerEvents';
import { VectorLayerEvents } from '@src/layer/event/VectorLayerEvents';
import { VectorImageLayerEvents } from '@src/layer/event/VectorImageLayerEvents';
import { WebGLTileLayerEvents } from '@src/layer/event/WebGLTileLayerEvents';
import { ImageLayerEvents } from '@src/layer/event/ImageLayerEvents';

// @formatter:off
// prettier-ignore
export type LayerObservable<T extends Observable> =
  T extends TileLayer<any> ? VectorTileLayerEvents<T> :
  T extends VectorLayer<any> ? VectorLayerEvents<T> :
  T extends VectorImageLayer<any> ? VectorImageLayerEvents<T> :
  T extends VectorTileLayer<any> ? VectorTileLayerEvents<T> :
  T extends WebGLTileLayer ? WebGLTileLayerEvents<T> :
  T extends ImageLayer<any> ? ImageLayerEvents<T> :
  never;
// @formatter:on
