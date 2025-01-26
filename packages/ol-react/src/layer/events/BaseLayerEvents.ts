import BaseEvent from 'ol/events/Event.js';
import { ObjectEvent } from 'ol/Object.js';
import RenderEvent from 'ol/render/Event.js';
import { BaseEvents } from '../../events/BaseEvents';

interface BaseLayerEvents extends BaseEvents {
  onChangeExtent?: (e: ObjectEvent) => void;
  onChangeMinResolution?: (e: ObjectEvent) => void;
  onChangeMaxResolution?: (e: ObjectEvent) => void;
  onChangeMinZoom?: (e: ObjectEvent) => void;
  onChangeMaxZoom?: (e: ObjectEvent) => void;
  onChangeOpacity?: (e: ObjectEvent) => void;
  onChangeVisible?: (e: ObjectEvent) => void;
  onChangeZIndex?: (e: ObjectEvent) => void;
}

interface LayerEvents extends BaseLayerEvents {
  onChangeSource?: (e: ObjectEvent) => void;

  /**
   * Triggered after a layer is rendered.
   * @param e - {@link RenderEvent}
   */
  onPreRender?: (e: RenderEvent) => void;

  /**
   * Triggered before a layer is rendered.
   * @param e - {@link RenderEvent}
   */
  onPostRender?: (e: RenderEvent) => void;
  onSourceReady?: (e: BaseEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseImageLayerEvents extends LayerEvents {}

export interface BaseTileLayerEvents extends LayerEvents {
  onChangePreload?: (e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError?: (e: ObjectEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseVectorLayerEvents extends LayerEvents {}
