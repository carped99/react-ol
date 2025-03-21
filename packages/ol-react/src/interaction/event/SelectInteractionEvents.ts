import { SelectEvent } from 'ol/interaction/Select.js';
import { InteractionEvents } from './InteractionEvents';

/**
 * Select Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface SelectInteractionEvents extends InteractionEvents {
  onSelect?: (e: SelectEvent) => void;
}
