import { ObjectEvent } from 'ol/Object.js';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * Interaction 이벤트 타입
 *
 * @category Event
 */
export interface InteractionEvents extends BaseEvents {
  onChangeActive?: (e: ObjectEvent) => void;
}
