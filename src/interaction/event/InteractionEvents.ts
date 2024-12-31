import { ObjectEvent } from 'ol/Object';
import { BaseEvents } from '@src/event/BaseEvent';

export interface InteractionEvents<T> extends BaseEvents<T> {
  onChangeActive?: (this: T, e: ObjectEvent) => void;
}
