import { SelectEvent } from 'ol/interaction/Select';
import { InteractionEvents } from './InteractionEvents';

export interface SelectInteractionEvents<T> extends InteractionEvents<T> {
  onSelect?: (this: T, e: SelectEvent) => void;
}
