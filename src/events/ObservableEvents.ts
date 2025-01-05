import { Geolocation, Map, View } from 'ol';
import Observable from 'ol/Observable';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorTileLayer from 'ol/layer/VectorTile';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import ImageLayer from 'ol/layer/Image';
import {
  DblClickDragZoom,
  DoubleClickZoom,
  DragAndDrop,
  DragBox,
  DragPan,
  DragRotate,
  DragRotateAndZoom,
  Draw,
  Extent,
  KeyboardPan,
  KeyboardZoom,
  Link,
  Modify,
  MouseWheelZoom,
  PinchRotate,
  PinchZoom,
  Select,
  Snap,
  Translate,
} from 'ol/interaction';
import { GeolocationEvents, MapEvents, ViewEvents } from '../map/events';
import {
  DblClickDragZoomInteractionEvents,
  DblClickZoomInteractionEvents,
  DragAndDropInteractionEvents,
  DragBoxInteractionEvents,
  DragPanInteractionEvents,
  DragRotateAndZoomInteractionEvents,
  DragRotateInteractionEvents,
  DrawInteractionEvents,
  ExtentInteractionEvents,
  KeyboardPanInteractionEvents,
  KeyboardZoomInteractionEvents,
  LinkInteractionEvents,
  ModifyInteractionEvents,
  MouseWheelZoomInteractionEvents,
  PinchRotateInteractionEvents,
  PinchZoomInteractionEvents,
  SelectInteractionEvents,
  SnapInteractionEvents,
  TranslateInteractionEvents,
} from '../interaction/event';
import {
  ImageLayerEvents,
  VectorImageLayerEvents,
  VectorLayerEvents,
  VectorTileLayerEvents,
  WebGLTileLayerEvents,
} from '../layer/events';

/**
 * Events for an observable.
 * @typeparam T - Observable type.
 *
 * @category Event
 */
// @formatter:off
// prettier-ignore
export type ObservableEvents<T extends Observable> =
  T extends Map ? MapEvents<T> :
  T extends View ? ViewEvents<T> :
  T extends Geolocation ? GeolocationEvents<T> :
  // Layer
  T extends TileLayer<any> ? VectorTileLayerEvents<T> :
  T extends VectorLayer<any> ? VectorLayerEvents<T> :
  T extends VectorImageLayer<any> ? VectorImageLayerEvents<T> :
  T extends VectorTileLayer<any> ? VectorTileLayerEvents<T> :
  T extends WebGLTileLayer ? WebGLTileLayerEvents<T> :
  T extends ImageLayer<any> ? ImageLayerEvents<T> :
  // Interaction
  T extends Select ? SelectInteractionEvents<T> :
  T extends Modify ? ModifyInteractionEvents<T> :
  T extends Draw ? DrawInteractionEvents<T> :
  T extends Snap ? SnapInteractionEvents<T> :
  T extends Link ? LinkInteractionEvents<T> :
  T extends KeyboardPan ? KeyboardPanInteractionEvents<T> :
  T extends KeyboardZoom ? KeyboardZoomInteractionEvents<T> :
  T extends DragAndDrop ? DragAndDropInteractionEvents<T> :
  T extends DragBox ? DragBoxInteractionEvents<T> :
  T extends DragPan ? DragPanInteractionEvents<T> :
  T extends DragRotate ? DragRotateInteractionEvents<T> :
  T extends DragRotateAndZoom ? DragRotateAndZoomInteractionEvents<T> :
  T extends DoubleClickZoom ? DblClickZoomInteractionEvents<T> :
  T extends DblClickDragZoom ? DblClickDragZoomInteractionEvents<T> :
  T extends Extent ? ExtentInteractionEvents<T> :
  T extends PinchRotate ? PinchRotateInteractionEvents<T> :
  T extends PinchZoom ? PinchZoomInteractionEvents<T> :
  T extends Translate ? TranslateInteractionEvents<T> :
  T extends MouseWheelZoom ? MouseWheelZoomInteractionEvents<T> :
  DefaultObservable<T>;
// @formatter:on

// 기본 이벤트 핸들러 타입
type DefaultObservable<T> = { [key: string]: (this: T, e: Event) => void };
