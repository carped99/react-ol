import { InteractionEvents } from './InteractionEvents';
import { DragAndDropEvent } from 'ol/interaction/DragAndDrop';

/**
 * DragAndDrop Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface DragAndDropInteractionEvents extends InteractionEvents {
  onAddFeatures?: (e: DragAndDropEvent) => void;
}
