import { ObjectEvent } from 'ol/Object';
import { OlBaseEvent } from '@src/event/OlBaseEvent';

/**
 * Interaction 이벤트 타입
 *
 * @category Event
 */
export interface OlInteractionEvents<T> extends OlBaseEvent<T> {
  onChangeActive?: (this: T, e: ObjectEvent) => void;
}
