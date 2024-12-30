import View from 'ol/View';
import VectorSource, { VectorSourceEvent } from 'ol/source/Vector';
import { BaseEvents } from '@src/hooks/event/BaseEvent';

export interface VectorSourceEvents extends BaseEvents<View> {
  /**
   * Triggered when a feature is added to the source.
   * @param e {@link VectorSourceEvent}
   */
  onAddFeature?: (this: VectorSource, e: VectorSourceEvent) => void;

  /**
   * Triggered when a feature is updated.
   * @param e {@link VectorSourceEvent}
   */
  onChangeFeature?: (this: VectorSource, e: VectorSourceEvent) => void;

  /**
   * Triggered when the clear method is called on the source.
   * @param e {@link VectorSourceEvent}
   */
  onClear?: (this: VectorSource, e: VectorSourceEvent) => void;

  /**
   * Triggered when features finishes loading.
   * @param e {@link VectorSourceEvent}
   */
  onFeaturesLoadEnd?: (this: VectorSource, e: VectorSourceEvent) => void;

  /**
   * Triggered if feature loading results in an error.
   * @param e {@link VectorSourceEvent}
   */
  onFeaturesLoadError?: (this: VectorSource, e: VectorSourceEvent) => void;

  /**
   * Triggered when features starts loading.
   * @param e {@link VectorSourceEvent}
   */
  onFeaturesLoadStart?: (this: VectorSource, e: VectorSourceEvent) => void;

  /**
   * Triggered when a feature is removed from the source.
   * @param e {@link VectorSourceEvent}
   */
  onRemoveFeature?: (this: VectorSource, e: VectorSourceEvent) => void;
}
