import { DrawEvent } from 'ol/interaction/Draw.js';
import { InteractionEvents } from './InteractionEvents';

/**
 * Draw Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface DrawInteractionEvents extends InteractionEvents {
  onDrawAbort?: (e: DrawEvent) => void;
  onDrawStart?: (e: DrawEvent) => void;
  onDrawEnd?: (e: DrawEvent) => void;
}
