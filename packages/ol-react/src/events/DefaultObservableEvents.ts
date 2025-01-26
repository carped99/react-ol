import Geolocation from 'ol/Geolocation.js';
import {
  DblClickDragZoom,
  DoubleClickZoom,
  DragAndDrop,
  DragBox,
  DragPan,
  DragRotate,
  DragRotateAndZoom,
  Draw,
  Extent,
  KeyboardPan,
  KeyboardZoom,
  Link,
  Modify,
  MouseWheelZoom,
  PinchRotate,
  PinchZoom,
  Select,
  Snap,
  Translate,
} from 'ol/interaction.js';
import Graticule from 'ol/layer/Graticule.js';
import Heatmap from 'ol/layer/Heatmap.js';
import ImageLayer from 'ol/layer/Image.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorImageLayer from 'ol/layer/VectorImage.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import WebGLTileLayer from 'ol/layer/WebGLTile.js';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import {
  DblClickDragZoomInteractionEvents,
  DblClickZoomInteractionEvents,
  DragAndDropInteractionEvents,
  DragBoxInteractionEvents,
  DragPanInteractionEvents,
  DragRotateAndZoomInteractionEvents,
  DragRotateInteractionEvents,
  DrawInteractionEvents,
  ExtentInteractionEvents,
  KeyboardPanInteractionEvents,
  KeyboardZoomInteractionEvents,
  LinkInteractionEvents,
  ModifyInteractionEvents,
  MouseWheelZoomInteractionEvents,
  PinchRotateInteractionEvents,
  PinchZoomInteractionEvents,
  SelectInteractionEvents,
  SnapInteractionEvents,
  TranslateInteractionEvents,
} from '../interaction/event';
import {
  HeatmapLayerEvents,
  ImageLayerEvents,
  VectorImageLayerEvents,
  VectorLayerEvents,
  VectorTileLayerEvents,
  WebGLTileLayerEvents,
} from '../layer/events';
import { GraticuleLayerEvents } from '../layer/events/GraticuleLayerEvents';
import { TileLayerEvents } from '../layer/events/TileLayerEvents';
import { GeolocationEvents, MapEvents, ViewEvents } from '../map/events';
import { OverlayEvents } from '../overlay/events';
import { VectorSourceEvents } from '../source/useVectorSource';

/**
 * Events for an observable.
 * @typeparam T - Observable type.
 *
 * @category Event
 */
// @formatter:off
// prettier-ignore
export type DefaultObservableEvents<T> =
  T extends Map ? MapEvents :
  T extends View ? ViewEvents :
  T extends Geolocation ? GeolocationEvents :
  // Layer
  T extends TileLayer<any> ? TileLayerEvents :
  T extends VectorLayer<any> ? VectorLayerEvents :
  T extends VectorImageLayer<any> ? VectorImageLayerEvents :
  T extends VectorTileLayer<any, any> ? VectorTileLayerEvents :
  T extends WebGLTileLayer ? WebGLTileLayerEvents :
  T extends ImageLayer<any> ? ImageLayerEvents :
  T extends Graticule ? GraticuleLayerEvents :
  T extends Heatmap<any, any> ? HeatmapLayerEvents :
  T extends VectorSource<any> ? VectorSourceEvents :
  // Interaction
  T extends Select ? SelectInteractionEvents :
  T extends Modify ? ModifyInteractionEvents :
  T extends Draw ? DrawInteractionEvents :
  T extends Snap ? SnapInteractionEvents :
  T extends Link ? LinkInteractionEvents :
  T extends KeyboardPan ? KeyboardPanInteractionEvents :
  T extends KeyboardZoom ? KeyboardZoomInteractionEvents :
  T extends DragAndDrop ? DragAndDropInteractionEvents :
  T extends DragBox ? DragBoxInteractionEvents :
  T extends DragPan ? DragPanInteractionEvents :
  T extends DragRotate ? DragRotateInteractionEvents :
  T extends DragRotateAndZoom ? DragRotateAndZoomInteractionEvents :
  T extends DoubleClickZoom ? DblClickZoomInteractionEvents :
  T extends DblClickDragZoom ? DblClickDragZoomInteractionEvents :
  T extends Extent ? ExtentInteractionEvents :
  T extends PinchRotate ? PinchRotateInteractionEvents :
  T extends PinchZoom ? PinchZoomInteractionEvents :
  T extends Translate ? TranslateInteractionEvents :
  T extends MouseWheelZoom ? MouseWheelZoomInteractionEvents :
  T extends Overlay ? OverlayEvents :
  never;
// @formatter:on
