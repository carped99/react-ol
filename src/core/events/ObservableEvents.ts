import { Geolocation, Map, View } from 'ol';
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
export type ObservableEvents<T> =
  T extends Map ? MapEvents :
  T extends View ? ViewEvents :
  T extends Geolocation ? GeolocationEvents :
  // Layer
  T extends TileLayer<any> ? VectorTileLayerEvents :
  T extends VectorLayer<any> ? VectorLayerEvents :
  T extends VectorImageLayer<any> ? VectorImageLayerEvents :
  T extends VectorTileLayer<any> ? VectorTileLayerEvents :
  T extends WebGLTileLayer ? WebGLTileLayerEvents :
  T extends ImageLayer<any> ? ImageLayerEvents :
  // Interaction
  T extends Select ? SelectInteractionEvents :
  T extends Modify ? ModifyInteractionEvents :
  T extends Draw ? DrawInteractionEvents :
  T extends Snap ? SnapInteractionEvents :
  T extends Link ? LinkInteractionEvents :
  T extends KeyboardPan ? KeyboardPanInteractionEvents :
  T extends KeyboardZoom ? KeyboardZoomInteractionEvents :
  T extends DragAndDrop ? DragAndDropInteractionEvents :
  T extends DragBox ? DragBoxInteractionEvents :
  T extends DragPan ? DragPanInteractionEvents :
  T extends DragRotate ? DragRotateInteractionEvents :
  T extends DragRotateAndZoom ? DragRotateAndZoomInteractionEvents :
  T extends DoubleClickZoom ? DblClickZoomInteractionEvents :
  T extends DblClickDragZoom ? DblClickDragZoomInteractionEvents :
  T extends Extent ? ExtentInteractionEvents :
  T extends PinchRotate ? PinchRotateInteractionEvents :
  T extends PinchZoom ? PinchZoomInteractionEvents :
  T extends Translate ? TranslateInteractionEvents :
  T extends MouseWheelZoom ? MouseWheelZoomInteractionEvents :
  DefaultObservable;
// @formatter:on

// 기본 이벤트 핸들러 타입
type DefaultObservable = { [key: string]: (e: Event) => void };
