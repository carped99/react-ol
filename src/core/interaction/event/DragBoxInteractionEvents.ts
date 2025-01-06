import { InteractionEvents } from './InteractionEvents';
import { DragBoxEvent } from 'ol/interaction/DragBox';

/**
 * DragBox Interaction 이벤트 타입
 *
 * @category Interaction/Event
 */
export interface DragBoxInteractionEvents extends InteractionEvents {
  onBoxCancel?: (e: DragBoxEvent) => void;
  onBoxDrag?: (e: DragBoxEvent) => void;
  onBoxStart?: (e: DragBoxEvent) => void;
  onBoxEnd?: (e: DragBoxEvent) => void;
}
