import { InteractionEvents } from './InteractionEvents';
import { ExtentEvent } from 'ol/interaction/Extent';

/**
 * Extent Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface ExtentInteractionEvents extends InteractionEvents {
  onExtentChanged?: (e: ExtentEvent) => void;
}
