import { SelectEvent } from 'ol/interaction/Select';
import { InteractionEvents } from './InteractionEvents';

/**
 * Pointer Interaction 이벤트 타입
 *
 * @category Interaction/Event
 */
export interface PointerInteractionEvents extends InteractionEvents {
  handleDownEvent?: (e: SelectEvent) => void;
}
