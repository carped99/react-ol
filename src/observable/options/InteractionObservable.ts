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
import { OlSelectInteractionEvents } from '@src/interaction/event/OlSelectInteractionEvents';
import { OlDrawInteractionEvents } from '@src/interaction/event/OlDrawInteractionEvents';
import { OlModifyInteractionEvents } from '@src/interaction/event/OlModifyInteractionEvents';
import { OlSnapInteractionEvents } from '@src/interaction/event/OlSnapInteractionEvents';
import { OlMouseWheelZoomInteractionEvents } from '@src/interaction/event/OlMouseWheelZoomInteractionEvents';
import { OlLinkInteractionEvents } from '@src/interaction/event/OlLinkInteractionEvents';
import { OlDragAndDropInteractionEvents } from '@src/interaction/event/OlDragAndDropInteractionEvents';
import { OlKeyboardZoomInteractionEvents } from '@src/interaction/event/OlKeyboardZoomInteractionEvents';
import { OlKeyboardPanInteractionEvents } from '@src/interaction/event/OlKeyboardPanInteractionEvents';
import { OlDblClickZoomInteractionEvents } from '@src/interaction/event/OlDblClickZoomInteractionEvents';
import { OlDblClickDragZoomInteractionEvents } from '@src/interaction/event/OlDblClickDragZoomInteractionEvents';
import { OlDragPanInteractionEvents } from '@src/interaction/event/OlDragPanInteractionEvents';
import { OlDragBoxInteractionEvents } from '@src/interaction/event/OlDragBoxInteractionEvents';
import { OlDragRotateInteractionEvents } from '@src/interaction/event/OlDragRotateInteractionEvents';
import { OlDragRotateAndZoomInteractionEvents } from '@src/interaction/event/OlDragRotateAndZoomInteractionEvents';
import { OlExtentInteractionEvents } from '@src/interaction/event/OlExtentInteractionEvents';
import { OlPinchZoomInteractionEvents } from '@src/interaction/event/OlPinchZoomInteractionEvents';
import { OlPinchRotateInteractionEvents } from '@src/interaction/event/OlPinchRotateInteractionEvents';
import { OlTranslateInteractionEvents } from '@src/interaction/event/OlTranslateInteractionEvents';

/**
 * Interaction 등록가능한 이벤트
 *
 * @category Event
 * @internal
 */
// @formatter:off
// prettier-ignore
export type InteractionObservable<T extends Observable> =
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
  never;
// @formatter:on
