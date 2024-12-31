import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { ObservableEvents } from './ObservableEvents';

export interface BaseEvents<T> extends ObservableEvents<T> {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @param e {@link BaseEvent}
   */
  onChange?: (this: T, e: BaseEvent) => void;

  /**
   * Generic error event. Triggered when an error occurs.
   * @param e {@link BaseEvent}
   */
  onError?: (this: T, e: BaseEvent) => void;

  /**
   * Triggered when a property is changed.
   * @param e {@link ObjectEvent}
   */
  onPropertyChange?: (this: T, e: ObjectEvent) => void;
}
