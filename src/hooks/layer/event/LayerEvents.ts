import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import { BaseLayerEvents } from '@src/hooks/layer/event/BaseLayerEvents';

export interface LayerEvents<T> extends BaseLayerEvents<T> {
  onChangeSource?: (this: T, e: ObjectEvent) => void;

  /**
   * Triggered after a layer is rendered.
   * @param e {@link RenderEvent}
   */
  onPreRender?: (this: T, e: RenderEvent) => void;

  /**
   * Triggered before a layer is rendered.
   * @param e {@link RenderEvent}
   */
  onPostRender?: (this: T, e: RenderEvent) => void;
  onSourceReady?: (this: T, e: BaseEvent) => void;
}
