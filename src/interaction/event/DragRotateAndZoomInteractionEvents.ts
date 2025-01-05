import { InteractionEvents } from './InteractionEvents';
import { DragRotateAndZoom } from 'ol/interaction';

/**
 * DragRotateAndZoom Interaction 이벤트
 *
 * @category Interaction/Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragRotateAndZoomInteractionEvents<T extends DragRotateAndZoom> extends InteractionEvents<T> {}
