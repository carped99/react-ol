import { InteractionEvents } from './InteractionEvents';
import { PinchZoom } from 'ol/interaction';

/**
 * PinchZoom Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PinchZoomInteractionEvents<T extends PinchZoom> extends InteractionEvents<T> {}
