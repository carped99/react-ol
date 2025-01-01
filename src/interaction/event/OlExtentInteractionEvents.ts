import { OlInteractionEvents } from './OlInteractionEvents';
import { Extent } from 'ol/interaction';
import { ExtentEvent } from 'ol/interaction/Extent';

/**
 * Extent Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface OlExtentInteractionEvents<T extends Extent> extends OlInteractionEvents<T> {
  onExtentChanged?: (this: T, e: ExtentEvent) => void;
}
