import { Map, View } from 'ol';
import Observable from 'ol/Observable';
import { OlMapEvents } from './options/OlMapEvents';
import { OlViewEvents } from './options/OlViewEvents';
import TileLayer from 'ol/layer/Tile';
import { OlVectorTileLayerEvents } from '@src/layer/event/OlVectorTileLayerEvents';
import VectorLayer from 'ol/layer/Vector';
import { OlVectorLayerEvents } from '@src/layer/event/OlVectorLayerEvents';
import VectorImageLayer from 'ol/layer/VectorImage';
import { OlVectorImageLayerEvents } from '@src/layer/event/OlVectorImageLayerEvents';
import VectorTileLayer from 'ol/layer/VectorTile';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import { OlWebGLTileLayerEvents } from '@src/layer/event/OlWebGLTileLayerEvents';
import ImageLayer from 'ol/layer/Image';
import { OlImageLayerEvents } from '@src/layer/event/OlImageLayerEvents';
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
import { OlSelectInteractionEvents } from '@src/interaction/event/OlSelectInteractionEvents';
import { OlModifyInteractionEvents } from '@src/interaction/event/OlModifyInteractionEvents';
import { OlDrawInteractionEvents } from '@src/interaction/event/OlDrawInteractionEvents';
import { OlSnapInteractionEvents } from '@src/interaction/event/OlSnapInteractionEvents';
import { OlLinkInteractionEvents } from '@src/interaction/event/OlLinkInteractionEvents';
import { OlKeyboardPanInteractionEvents } from '@src/interaction/event/OlKeyboardPanInteractionEvents';
import { OlKeyboardZoomInteractionEvents } from '@src/interaction/event/OlKeyboardZoomInteractionEvents';
import { OlDragAndDropInteractionEvents } from '@src/interaction/event/OlDragAndDropInteractionEvents';
import { OlDragBoxInteractionEvents } from '@src/interaction/event/OlDragBoxInteractionEvents';
import { OlDragPanInteractionEvents } from '@src/interaction/event/OlDragPanInteractionEvents';
import { OlDragRotateInteractionEvents } from '@src/interaction/event/OlDragRotateInteractionEvents';
import { OlDragRotateAndZoomInteractionEvents } from '@src/interaction/event/OlDragRotateAndZoomInteractionEvents';
import { OlDblClickZoomInteractionEvents } from '@src/interaction/event/OlDblClickZoomInteractionEvents';
import { OlDblClickDragZoomInteractionEvents } from '@src/interaction/event/OlDblClickDragZoomInteractionEvents';
import { OlExtentInteractionEvents } from '@src/interaction/event/OlExtentInteractionEvents';
import { OlPinchRotateInteractionEvents } from '@src/interaction/event/OlPinchRotateInteractionEvents';
import { OlPinchZoomInteractionEvents } from '@src/interaction/event/OlPinchZoomInteractionEvents';
import { OlTranslateInteractionEvents } from '@src/interaction/event/OlTranslateInteractionEvents';
import { OlMouseWheelZoomInteractionEvents } from '@src/interaction/event/OlMouseWheelZoomInteractionEvents';

/**
 * Options for an observable.
 * @typeparam T - Observable type.
 *
 * @category Observable
 */
// @formatter:off
// prettier-ignore
export type OlObservableOptions<T extends Observable> =
  T extends Map ? OlMapEvents<T> :
  T extends View ? OlViewEvents<T> :
  // Layer
  T extends TileLayer<any> ? OlVectorTileLayerEvents<T> :
  T extends VectorLayer<any> ? OlVectorLayerEvents<T> :
  T extends VectorImageLayer<any> ? OlVectorImageLayerEvents<T> :
  T extends VectorTileLayer<any> ? OlVectorTileLayerEvents<T> :
  T extends WebGLTileLayer ? OlWebGLTileLayerEvents<T> :
  T extends ImageLayer<any> ? OlImageLayerEvents<T> :
  // Interaction
  T extends Select ? OlSelectInteractionEvents<T> :
  T extends Modify ? OlModifyInteractionEvents<T> :
  T extends Draw ? OlDrawInteractionEvents<T> :
  T extends Snap ? OlSnapInteractionEvents<T> :
  T extends Link ? OlLinkInteractionEvents<T> :
  T extends KeyboardPan ? OlKeyboardPanInteractionEvents<T> :
  T extends KeyboardZoom ? OlKeyboardZoomInteractionEvents<T> :
  T extends DragAndDrop ? OlDragAndDropInteractionEvents<T> :
  T extends DragBox ? OlDragBoxInteractionEvents<T> :
  T extends DragPan ? OlDragPanInteractionEvents<T> :
  T extends DragRotate ? OlDragRotateInteractionEvents<T> :
  T extends DragRotateAndZoom ? OlDragRotateAndZoomInteractionEvents<T> :
  T extends DoubleClickZoom ? OlDblClickZoomInteractionEvents<T> :
  T extends DblClickDragZoom ? OlDblClickDragZoomInteractionEvents<T> :
  T extends Extent ? OlExtentInteractionEvents<T> :
  T extends PinchRotate ? OlPinchRotateInteractionEvents<T> :
  T extends PinchZoom ? OlPinchZoomInteractionEvents<T> :
  T extends Translate ? OlTranslateInteractionEvents<T> :
  T extends MouseWheelZoom ? OlMouseWheelZoomInteractionEvents<T> :
  DefaultObservable<T>;
// @formatter:on

// 기본 이벤트 핸들러 타입
type DefaultObservable<T> = { [key: string]: (this: T, e: Event) => void };
