import Observable from 'ol/Observable';
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
} from '../../interaction/event';

/**
 * Interaction 등록가능한 이벤트
 *
 * @category Event
 * @internal
 */
// @formatter:off
// prettier-ignore
export type InteractionObservable<T extends Observable> =
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
  never;
// @formatter:on
