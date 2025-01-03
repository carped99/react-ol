import { InteractionEvents } from './InteractionEvents';
import { DragBox } from 'ol/interaction';
import { DragBoxEvent } from 'ol/interaction/DragBox';

/**
 * DragBox Interaction 이벤트 타입
 *
 * @category Interaction Event
 */
export interface DragBoxInteractionEvents<T extends DragBox> extends InteractionEvents<T> {
  onBoxCancel?: (this: T, e: DragBoxEvent) => void;
  onBoxDrag?: (this: T, e: DragBoxEvent) => void;
  onBoxStart?: (this: T, e: DragBoxEvent) => void;
  onBoxEnd?: (this: T, e: DragBoxEvent) => void;
}
