import { Map, MapBrowserEvent, MapEvent } from 'ol';
import RenderEvent from 'ol/render/Event';
import { ObjectEvent } from 'ol/Object';
import { OlBaseEvent } from '@src/event/OlBaseEvent';

/**
 * 지도 이벤트 타입
 *
 * @category Event
 */
export interface OlMapEvents<T> extends OlBaseEvent<T> {
  /**
   * A click with no dragging. A double click will fire two of this.
   * @param e {@link MapBrowserEvent}
   */
  onClick?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * A true single click with no dragging and no double click. Note that this event is delayed by 250 ms to ensure that it is not a double click.
   * @param e {@link MapBrowserEvent}
   */
  onSingleClick?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * A true double click, with no dragging.
   * @param e {@link MapBrowserEvent}
   */
  onDblClick?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * Triggered when loading of additional map data (tiles, images, features) starts.
   * @param e {@link MapEvent}
   */
  onLoadStart?: (this: Map, e: MapEvent) => boolean | void;

  /**
   * Triggered when loading of additional map data has completed.
   * @param e {@link MapEvent}
   */
  onLoadEnd?: (this: Map, e: MapEvent) => boolean | void;

  /**
   * Triggered when the map starts moving.
   * @param e {@link MapEvent}
   */
  onMoveStart?: (this: Map, e: MapEvent) => boolean | void;

  /**
   * Triggered after the map is moved.
   * @param e {@link MapEvent}
   */
  onMoveEnd?: (this: Map, e: MapEvent) => boolean | void;

  /**
   *  Triggered when a pointer is dragged.
   * @param e {@link MapBrowserEvent}
   */
  onPointerDrag?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * Triggered when a pointer is moved. Note that on touch devices this is triggered when the map is panned, so is not the same as mousemove.
   * @param e {@link MapBrowserEvent}
   */
  onPointerMove?: (this: Map, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * Triggered after a map frame is rendered.
   * @param e {@link MapEvent}
   */
  onPostRender?: (this: Map, e: MapEvent) => boolean | void;

  /**
   * Triggered before layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
   * @param e {@link RenderEvent}
   */
  onPreCompose?: (this: Map, e: RenderEvent) => boolean | void;

  /**
   *  Triggered after layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
   * @param e {@link RenderEvent}
   */
  onPostCompose?: (this: Map, e: RenderEvent) => boolean | void;

  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have finished loading for the current viewport, and all tiles are faded in. The event object will not have a context set.
   * @param e {@link RenderEvent}
   */
  onRenderComplete?: (this: Map, e: RenderEvent) => boolean | void;
  onChangeLayerGroup?: (this: Map, e: ObjectEvent) => void;
  onChangeSize?: (this: Map, e: ObjectEvent) => void;
  onChangeTarget?: (this: Map, e: ObjectEvent) => void;
  onChangeView?: (this: Map, e: ObjectEvent) => void;
}
