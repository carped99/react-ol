import { SelectEvent } from 'ol/interaction/Select';
import { InteractionEvents } from './InteractionEvents';
import { Select } from 'ol/interaction';

export interface SelectInteractionEvents<T extends Select> extends InteractionEvents<T> {
  onSelect?: (this: T, e: SelectEvent) => void;
}
