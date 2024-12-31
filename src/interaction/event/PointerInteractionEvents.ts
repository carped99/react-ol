import { SelectEvent } from 'ol/interaction/Select';
import { InteractionEvents } from './InteractionEvents';

export interface PointerInteractionEvents<T> extends InteractionEvents<T> {
  handleDownEvent?: (this: T, e: SelectEvent) => void;
}
