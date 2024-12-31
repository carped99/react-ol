import { ObjectEvent } from 'ol/Object';
import View from 'ol/View';
import { BaseEvents } from './BaseEvent';

export interface ViewEvents extends BaseEvents<View> {
  onChangeCenter?: (this: View, e: ObjectEvent) => void;
  onChangeResolution?: (this: View, e: ObjectEvent) => void;
  onChangeRotation?: (this: View, e: ObjectEvent) => void;
}
