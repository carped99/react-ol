import { OlInteractionEvents } from './OlInteractionEvents';
import { SnapEvent } from 'ol/events/SnapEvent';
import { Snap } from 'ol/interaction';

/**
 * Snap Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface OlSnapInteractionEvents<T extends Snap> extends OlInteractionEvents<T> {
  onSnap?: (this: T, e: SnapEvent) => void;
}
