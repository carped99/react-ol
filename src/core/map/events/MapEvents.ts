import { MapBrowserEvent, MapEvent } from 'ol';
import RenderEvent from 'ol/render/Event';
import { ObjectEvent } from 'ol/Object';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * 지도 이벤트 타입
 *
 * @category Base/Events
 */
export interface MapEvents<T> extends BaseEvents<T> {
  /**
   * A click with no dragging. A double click will fire two of this.
   * @param e - {@link MapBrowserEvent}
   */
  onClick?: (this: T, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * A true single click with no dragging and no double click. Note that this event is delayed by 250 ms to ensure that it is not a double click.
   * @param e - {@link MapBrowserEvent}
   */
  onSingleClick?: (this: T, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * A true double click, with no dragging.
   * @param e - {@link MapBrowserEvent}
   */
  onDblClick?: (this: T, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * Triggered when loading of additional map data (tiles, images, features) starts.
   * @param e - {@link MapEvent}
   */
  onLoadStart?: (this: T, e: MapEvent) => boolean | void;

  /**
   * Triggered when loading of additional map data has completed.
   * @param e - {@link MapEvent}
   */
  onLoadEnd?: (this: T, e: MapEvent) => boolean | void;

  /**
   * Triggered when the map starts moving.
   * @param e - {@link MapEvent}
   */
  onMoveStart?: (this: T, e: MapEvent) => boolean | void;

  /**
   * Triggered after the map is moved.
   * @param e - {@link MapEvent}
   */
  onMoveEnd?: (this: T, e: MapEvent) => boolean | void;

  /**
   *  Triggered when a pointer is dragged.
   * @param e - {@link MapBrowserEvent}
   */
  onPointerDrag?: (this: T, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * Triggered when a pointer is moved. Note that on touch devices this is triggered when the map is panned, so is not the same as mousemove.
   * @param e - {@link MapBrowserEvent}
   */
  onPointerMove?: (this: T, e: MapBrowserEvent<UIEvent>) => boolean | void;

  /**
   * Triggered after a map frame is rendered.
   * @param e - {@link MapEvent}
   */
  onPostRender?: (this: T, e: MapEvent) => boolean | void;

  /**
   * Triggered before layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
   * @param e - {@link RenderEvent}
   */
  onPreCompose?: (this: T, e: RenderEvent) => boolean | void;

  /**
   *  Triggered after layers are composed. When dispatched by the map, the event object will not have a context set. When dispatched by a layer, the event object will have a context set. Only WebGL layers currently dispatch this event.
   * @param e - {@link RenderEvent}
   */
  onPostCompose?: (this: T, e: RenderEvent) => boolean | void;

  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have finished loading for the current viewport, and all tiles are faded in. The event object will not have a context set.
   * @param e - {@link RenderEvent}
   */
  onRenderComplete?: (this: T, e: RenderEvent) => void;
  onChangeLayerGroup?: (this: T, e: ObjectEvent) => void;
  onChangeSize?: (this: T, e: ObjectEvent) => void;
  onChangeTarget?: (this: T, e: ObjectEvent) => void;
  onChangeView?: (this: T, e: ObjectEvent) => void;

  // 동적으로 추가되는 속성
  [key: string]: ((this: T, e: any) => void) | undefined;
}
