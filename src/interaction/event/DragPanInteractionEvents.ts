import { InteractionEvents } from './InteractionEvents';
import { DragPan } from 'ol/interaction';

/**
 * DragPan Interaction 이벤트 타입
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragPanInteractionEvents<T extends DragPan> extends InteractionEvents<T> {}
