import { OlInteractionEvents } from './OlInteractionEvents';
import { DragRotate } from 'ol/interaction';

/**
 * DragRotate Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragRotateInteractionEvents<T extends DragRotate> extends OlInteractionEvents<T> {}
