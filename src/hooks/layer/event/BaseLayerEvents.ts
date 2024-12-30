import { BaseEvents } from '@src/hooks/event/BaseEvent';
import { ObjectEvent } from 'ol/Object';

export interface BaseLayerEvents<T> extends BaseEvents<T> {
  onChangeExtent?: (this: T, e: ObjectEvent) => void;
  onChangeMinResolution?: (this: T, e: ObjectEvent) => void;
  onChangeMaxResolution?: (this: T, e: ObjectEvent) => void;
  onChangeMinZoom?: (this: T, e: ObjectEvent) => void;
  onChangeMaxZoom?: (this: T, e: ObjectEvent) => void;
  onChangeOpacity?: (this: T, e: ObjectEvent) => void;
  onChangeVisible?: (this: T, e: ObjectEvent) => void;
  onChangeZIndex?: (this: T, e: ObjectEvent) => void;
}
