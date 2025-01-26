import { DragAndDropEvent } from 'ol/interaction/DragAndDrop.js';
import { InteractionEvents } from './InteractionEvents';

/**
 * DragAndDrop Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface DragAndDropInteractionEvents extends InteractionEvents {
  onAddFeatures?: (e: DragAndDropEvent) => void;
}
