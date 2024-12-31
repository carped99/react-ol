import { ObjectEvent } from 'ol/Object';
import { BaseEvents } from '@src/event/BaseEvent';

export interface ViewObservable<T> extends BaseEvents<T> {
  onChangeCenter?: (this: T, e: ObjectEvent) => void;
  onChangeResolution?: (this: T, e: ObjectEvent) => void;
  onChangeRotation?: (this: T, e: ObjectEvent) => void;
}
