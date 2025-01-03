import { SelectEvent } from 'ol/interaction/Select';
import { InteractionEvents } from './InteractionEvents';
import { Select } from 'ol/interaction';

/**
 * Select Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface SelectInteractionEvents<T extends Select> extends InteractionEvents<T> {
  onSelect?: (this: T, e: SelectEvent) => void;
}
