import { OlInteractionEvents } from './OlInteractionEvents';
import { DragRotateAndZoom } from 'ol/interaction';

/**
 * DragRotateAndZoom Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDragRotateAndZoomInteractionEvents<T extends DragRotateAndZoom> extends OlInteractionEvents<T> {}
