import BaseEvent from 'ol/events/Event.js';
import { ObjectEvent } from 'ol/Object.js';

export interface BaseEvents {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   *
   * @param e - {@link BaseEvent}
   */
  onChange?: (e: BaseEvent) => void;

  /**
   * Generic error event. Triggered when an error occurs.
   *
   * @param e - {@link BaseEvent}
   */
  onError?: (e: BaseEvent) => void;

  /**
   * Triggered when a property is changed.
   *
   * @param e - {@link ObjectEvent}
   */
  onPropertyChange?: (e: ObjectEvent) => void;
}
