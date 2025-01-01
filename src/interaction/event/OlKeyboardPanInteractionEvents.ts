import { OlInteractionEvents } from './OlInteractionEvents';
import { KeyboardPan } from 'ol/interaction';

/**
 * KeyboardPan Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlKeyboardPanInteractionEvents<T extends KeyboardPan> extends OlInteractionEvents<T> {}
