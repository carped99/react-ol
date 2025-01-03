import { InteractionEvents } from './InteractionEvents';
import { DragRotate } from 'ol/interaction';

/**
 * DragRotate Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragRotateInteractionEvents<T extends DragRotate> extends InteractionEvents<T> {}
