import { OlInteractionEvents } from './OlInteractionEvents';
import { DoubleClickZoom } from 'ol/interaction';

/**
 * DoubleClickZoom Interaction 이벤트 타입
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDblClickZoomInteractionEvents<T extends DoubleClickZoom> extends OlInteractionEvents<T> {}
