import { OlInteractionEvents } from './OlInteractionEvents';
import { PinchZoom } from 'ol/interaction';

/**
 * PinchZoom Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlPinchZoomInteractionEvents<T extends PinchZoom> extends OlInteractionEvents<T> {}
