import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import { OlBaseEvent } from '@src/event/OlBaseEvent';

interface OlBaseLayerEvents<T> extends OlBaseEvent<T> {
  onChangeExtent?: (this: T, e: ObjectEvent) => void;
  onChangeMinResolution?: (this: T, e: ObjectEvent) => void;
  onChangeMaxResolution?: (this: T, e: ObjectEvent) => void;
  onChangeMinZoom?: (this: T, e: ObjectEvent) => void;
  onChangeMaxZoom?: (this: T, e: ObjectEvent) => void;
  onChangeOpacity?: (this: T, e: ObjectEvent) => void;
  onChangeVisible?: (this: T, e: ObjectEvent) => void;
  onChangeZIndex?: (this: T, e: ObjectEvent) => void;
}

interface OlLayerEvents<T> extends OlBaseLayerEvents<T> {
  onChangeSource?: (this: T, e: ObjectEvent) => void;

  /**
   * Triggered after a layer is rendered.
   * @param e - {@link RenderEvent}
   */
  onPreRender?: (this: T, e: RenderEvent) => void;

  /**
   * Triggered before a layer is rendered.
   * @param e - {@link RenderEvent}
   */
  onPostRender?: (this: T, e: RenderEvent) => void;
  onSourceReady?: (this: T, e: BaseEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlBaseImageLayerEvents<T> extends OlLayerEvents<T> {}

export interface OlBaseTileLayerEvents<T> extends OlLayerEvents<T> {
  onChangePreload?: (this: T, e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError?: (this: T, e: ObjectEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlBaseVectorLayerEvents<T> extends OlLayerEvents<T> {}
