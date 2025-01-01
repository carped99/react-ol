import { OlInteractionEvents } from './OlInteractionEvents';
import { KeyboardZoom } from 'ol/interaction';

/**
 * KeyboardZoom Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlKeyboardZoomInteractionEvents<T extends KeyboardZoom> extends OlInteractionEvents<T> {}
