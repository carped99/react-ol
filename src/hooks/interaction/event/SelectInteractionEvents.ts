import { InteractionEvents } from '@src/hooks/interaction/event/InteractionEvents';
import { SelectEvent } from 'ol/interaction/Select';

export interface SelectInteractionEvents<T> extends InteractionEvents<T> {
  onSelect?: (this: T, e: SelectEvent) => void;
}
