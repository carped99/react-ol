import { InteractionEvents } from './InteractionEvents';
import { Extent } from 'ol/interaction';
import { ExtentEvent } from 'ol/interaction/Extent';

/**
 * Extent Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface ExtentInteractionEvents<T extends Extent> extends InteractionEvents<T> {
  onExtentChanged?: (this: T, e: ExtentEvent) => void;
}
