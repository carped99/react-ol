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
} from 'ol/interaction.js';
import Observable from 'ol/Observable.js';
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
  never;
// @formatter:on
