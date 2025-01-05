import { InteractionEvents } from './InteractionEvents';
import { MouseWheelZoom } from 'ol/interaction';

/**
 * MouseWheelZoom Interaction 이벤트
 *
 * @category Interaction/Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MouseWheelZoomInteractionEvents<T extends MouseWheelZoom> extends InteractionEvents<T> {}
