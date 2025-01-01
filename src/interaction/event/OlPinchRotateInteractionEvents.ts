import { OlInteractionEvents } from './OlInteractionEvents';
import { PinchRotate } from 'ol/interaction';

/**
 * PinchRotate Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlPinchRotateInteractionEvents<T extends PinchRotate> extends OlInteractionEvents<T> {}
