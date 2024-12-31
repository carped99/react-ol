import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';
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

// prettier-ignore
export type LayerObservable<T extends Observable> =
  T extends TileLayer<infer S extends TileSource> ? VectorTileLayerEvents<TileLayer<S>> :
  T extends VectorLayer<infer S> ? VectorLayerEvents<S> :
  T extends VectorImageLayer<infer S> ? VectorImageLayerEvents<S> :
  T extends VectorTileLayer<infer S> ? VectorTileLayerEvents<S> :
  T extends WebGLTileLayer ? WebGLTileLayerEvents :
  T extends ImageLayer<infer S> ? ImageLayerEvents<S> :
  never;
