import MapBrowserEvent from 'ol/MapBrowserEvent.js';
import MapEvent from 'ol/MapEvent.js';
import { ObjectEvent } from 'ol/Object.js';
import RenderEvent from 'ol/render/Event.js';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * 지도 이벤트 타입
 *
 * @category Base/Events
 */
export interface MapEvents extends BaseEvents {
  /**
   * A click with no dragging. A double click will fire two of this.
   * @param e - {@link MapBrowserEvent}
   */
  onClick?: (e: MapBrowserEvent<PointerEvent>) => void;

  /**
   * A true single click with no dragging and no double click. Note that this event is delayed by 250 ms to ensure that it is not a double click.
   * @param e - {@link MapBrowserEvent}
   */
  onSingleClick?: (e: MapBrowserEvent<PointerEvent>) => void;

  /**
   * A true double click, with no dragging.
   * @param e - {@link MapBrowserEvent}
   */
  onDblClick?: (e: MapBrowserEvent<PointerEvent>) => void;

  /**
   * Triggered when loading of additional map data (tiles, images, features) starts.
   * @param e - {@link MapEvent}
   */
  onLoadStart?: (e: MapEvent) => void;

  /**
   * Triggered when loading of additional map data has completed.
   * @param e - {@link MapEvent}
   */
  onLoadEnd?: (e: MapEvent) => void;

  /**
   * Triggered when the map starts moving.
   * @param e - {@link MapEvent}
   */
  onMoveStart?: (e: MapEvent) => void;

  /**
   * Triggered after the map is moved.
   * @param e - {@link MapEvent}
   */
  onMoveEnd?: (e: MapEvent) => void;

  /**
   *  Triggered when a pointer is dragged.
   * @param e - {@link MapBrowserEvent}
   */
  onPointerDrag?: (e: MapBrowserEvent<PointerEvent>) => void;

  /**
   * Triggered when a pointer is moved. Note that on touch devices this is triggered when the map is panned, so is not the same as mousemove.
   * @param e - {@link MapBrowserEvent}
   */
  onPointerMove?: (e: MapBrowserEvent<PointerEvent>) => void;

  /**
   * Triggered after a map frame is rendered.
   * @param e - {@link MapEvent}
   */
  onPostRender?: (e: MapEvent) => void;

  /**
   * Triggered before layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
   * @param e - {@link RenderEvent}
   */
  onPreCompose?: (e: RenderEvent) => void;

  /**
   *  Triggered after layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
   * @param e - {@link RenderEvent}
   */
  onPostCompose?: (e: RenderEvent) => void;

  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have finished loading for the current viewport, and all tiles are faded in. The event object will not have a context set.
   * @param e - {@link RenderEvent}
   */
  onRenderComplete?: (e: RenderEvent) => void;
  onChangeLayerGroup?: (e: ObjectEvent) => void;
  onChangeSize?: (e: ObjectEvent) => void;
  onChangeTarget?: (e: ObjectEvent) => void;
  onChangeView?: (e: ObjectEvent) => void;
}
