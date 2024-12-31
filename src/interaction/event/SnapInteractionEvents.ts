import { InteractionEvents } from './InteractionEvents';
import { SnapEvent } from 'ol/events/SnapEvent';
import { Snap } from 'ol/interaction';

export interface SnapInteractionEvents<T extends Snap> extends InteractionEvents<T> {
  onSnap?: (this: T, e: SnapEvent) => void;
}
