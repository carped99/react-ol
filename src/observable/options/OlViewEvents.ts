import { ObjectEvent } from 'ol/Object';
import { OlBaseEvent } from '@src/event/OlBaseEvent';

/**
 * View 이벤트 타입
 *
 * @category Event
 */
export interface OlViewEvents<T> extends OlBaseEvent<T> {
  onChangeCenter?: (this: T, e: ObjectEvent) => void;
  onChangeResolution?: (this: T, e: ObjectEvent) => void;
  onChangeRotation?: (this: T, e: ObjectEvent) => void;
}
