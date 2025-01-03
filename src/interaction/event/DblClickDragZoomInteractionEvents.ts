import { InteractionEvents } from './InteractionEvents';
import { DblClickDragZoom } from 'ol/interaction';

/**
 * DblClickDragZoom Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DblClickDragZoomInteractionEvents<T extends DblClickDragZoom> extends InteractionEvents<T> {}
