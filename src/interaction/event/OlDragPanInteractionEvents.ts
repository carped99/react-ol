import { OlInteractionEvents } from './OlInteractionEvents';
import { DragPan } from 'ol/interaction';

/**
 * DragPan Interaction 이벤트 타입
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragPanInteractionEvents<T extends DragPan> extends OlInteractionEvents<T> {}
