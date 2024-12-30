import { BaseEvents } from '@src/hooks/event/BaseEvent';
import { ObjectEvent } from 'ol/Object';

export interface InteractionEvents<T> extends BaseEvents<T> {
  onChangeActive?: (this: T, e: ObjectEvent) => void;
}
