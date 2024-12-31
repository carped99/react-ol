import { InteractionEvents } from './InteractionEvents';
import { DragAndDrop } from 'ol/interaction';
import { DragAndDropEvent } from 'ol/interaction/DragAndDrop';

export interface DragAndDropInteractionEvents<T extends DragAndDrop> extends InteractionEvents<T> {
  onAddFeatures?: (this: T, e: DragAndDropEvent) => void;
}
