import { InteractionEvents } from './InteractionEvents';
import { ModifyEvent } from 'ol/interaction/Modify';
import { Modify } from 'ol/interaction';

/**
 * Modify Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface ModifyInteractionEvents<T extends Modify> extends InteractionEvents<T> {
  onModifyStart?: (this: T, e: ModifyEvent) => void;
  onModifyEnd?: (this: T, e: ModifyEvent) => void;
}
