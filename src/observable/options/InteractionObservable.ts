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
import { SelectInteractionEvents } from '@src/interaction/event/SelectInteractionEvents';
import { DrawInteractionEvents } from '@src/interaction/event/DrawInteractionEvents';
import { ModifyInteractionEvents } from '@src/interaction/event/ModifyInteractionEvents';
import { SnapInteractionEvents } from '@src/interaction/event/SnapInteractionEvents';
import { TranslateInteractionEvents } from '@src/interaction/event/TranslatetInteractionEvents';
import { MouseWheelZoomInteractionEvents } from '@src/interaction/event/MouseWheelZoomInteractionEvents';
import { LinkInteractionEvents } from '@src/interaction/event/LinkInteractionEvents';
import { DragAndDropInteractionEvents } from '@src/interaction/event/DragAndDropInteractionEvents';
import { KeyboardZoomInteractionEvents } from '@src/interaction/event/KeyboardZoomInteractionEvents';
import { KeyboardPanInteractionEvents } from '@src/interaction/event/KeyboardPanInteractionEvents';
import { DblClickZoomInteractionEvents } from '@src/interaction/event/DblClickZoomInteractionEvents';
import { DblClickDragZoomInteractionEvents } from '@src/interaction/event/DblClickDragZoomInteractionEvents';
import { DragPanInteractionEvents } from '@src/interaction/event/DragPanInteractionEvents';
import { DragBoxInteractionEvents } from '@src/interaction/event/DragBoxInteractionEvents';
import { DragRotateInteractionEvents } from '@src/interaction/event/DragRotateInteractionEvents';
import { DragRotateAndZoomInteractionEvents } from '@src/interaction/event/DragRotateAndZoomInteractionEvents';
import { ExtentInteractionEvents } from '@src/interaction/event/ExtentInteractionEvents';
import { PinchZoomInteractionEvents } from '@src/interaction/event/PinchZoomInteractionEvents';
import { PinchRotateInteractionEvents } from '@src/interaction/event/PinchRotateInteractionEvents';

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
