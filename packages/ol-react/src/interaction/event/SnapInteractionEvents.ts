import { InteractionEvents } from './InteractionEvents';
import { SnapEvent } from 'ol/events/SnapEvent';

/**
 * Snap Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface SnapInteractionEvents extends InteractionEvents {
  onSnap?: (e: SnapEvent) => void;
}
