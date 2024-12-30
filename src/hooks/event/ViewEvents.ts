import { ObjectEvent } from 'ol/Object';
import View from 'ol/View';
import { BaseEvents } from '@src/hooks/event/BaseEvent';

export interface ViewEvents extends BaseEvents<View> {
  onChangeCenter?: (this: View, e: ObjectEvent) => void;
  onChangeResolution?: (this: View, e: ObjectEvent) => void;
  onChangeRotation?: (this: View, e: ObjectEvent) => void;
}
