import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import { BaseEvents } from '@src/event/BaseEvent';

interface BaseLayerEvents<T> extends BaseEvents<T> {
  onChangeExtent?: (this: T, e: ObjectEvent) => void;
  onChangeMinResolution?: (this: T, e: ObjectEvent) => void;
  onChangeMaxResolution?: (this: T, e: ObjectEvent) => void;
  onChangeMinZoom?: (this: T, e: ObjectEvent) => void;
  onChangeMaxZoom?: (this: T, e: ObjectEvent) => void;
  onChangeOpacity?: (this: T, e: ObjectEvent) => void;
  onChangeVisible?: (this: T, e: ObjectEvent) => void;
  onChangeZIndex?: (this: T, e: ObjectEvent) => void;
}

interface LayerEvents<T> extends BaseLayerEvents<T> {
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

export type BaseImageLayerEvents<T> = LayerEvents<T>;

export interface BaseTileLayerEvents<T> extends LayerEvents<T> {
  onChangePreload?: (this: T, e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError?: (this: T, e: ObjectEvent) => void;
}

export type BaseVectorLayerEvents<T> = LayerEvents<T>;
