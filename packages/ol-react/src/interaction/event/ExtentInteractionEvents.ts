import { ExtentEvent } from 'ol/interaction/Extent.js';
import { InteractionEvents } from './InteractionEvents';

/**
 * Extent Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface ExtentInteractionEvents extends InteractionEvents {
  onExtentChanged?: (e: ExtentEvent) => void;
}
