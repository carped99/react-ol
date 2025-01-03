import { InteractionEvents } from './InteractionEvents';
import { SnapEvent } from 'ol/events/SnapEvent';
import { Snap } from 'ol/interaction';

/**
 * Snap Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface SnapInteractionEvents<T extends Snap> extends InteractionEvents<T> {
  onSnap?: (this: T, e: SnapEvent) => void;
}
