import { OlInteractionEvents } from './OlInteractionEvents';
import { DragAndDrop } from 'ol/interaction';
import { DragAndDropEvent } from 'ol/interaction/DragAndDrop';

/**
 * DragAndDrop Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface OlDragAndDropInteractionEvents<T extends DragAndDrop> extends OlInteractionEvents<T> {
  onAddFeatures?: (this: T, e: DragAndDropEvent) => void;
}
