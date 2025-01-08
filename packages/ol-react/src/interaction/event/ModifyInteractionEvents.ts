import { InteractionEvents } from './InteractionEvents';
import { ModifyEvent } from 'ol/interaction/Modify';

/**
 * Modify Interaction 이벤트
 *
 * @category Interaction/Event
 */
export interface ModifyInteractionEvents extends InteractionEvents {
  onModifyStart?: (e: ModifyEvent) => void;
  onModifyEnd?: (e: ModifyEvent) => void;
}
