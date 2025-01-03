import { InteractionEvents } from './InteractionEvents';
import { PinchRotate } from 'ol/interaction';

/**
 * PinchRotate Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PinchRotateInteractionEvents<T extends PinchRotate> extends InteractionEvents<T> {}
