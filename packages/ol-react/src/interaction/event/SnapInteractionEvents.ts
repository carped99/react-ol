import { SnapEvent } from 'ol/events/SnapEvent.js';
import { InteractionEvents } from './InteractionEvents';

/**
 * Snap Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface SnapInteractionEvents extends InteractionEvents {
  onSnap?: (e: SnapEvent) => void;
}
