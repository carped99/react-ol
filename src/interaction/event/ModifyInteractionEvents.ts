import { InteractionEvents } from './InteractionEvents';
import { ModifyEvent } from 'ol/interaction/Modify';
import { Modify } from 'ol/interaction';

export interface ModifyInteractionEvents<T extends Modify> extends InteractionEvents<T> {
  onModifyStart?: (this: T, e: ModifyEvent) => void;
  onModifyEnd?: (this: T, e: ModifyEvent) => void;
}
