import { OlInteractionEvents } from './OlInteractionEvents';
import { ModifyEvent } from 'ol/interaction/Modify';
import { Modify } from 'ol/interaction';

/**
 * Modify Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface OlModifyInteractionEvents<T extends Modify> extends OlInteractionEvents<T> {
  onModifyStart?: (this: T, e: ModifyEvent) => void;
  onModifyEnd?: (this: T, e: ModifyEvent) => void;
}
