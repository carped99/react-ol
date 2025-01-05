import { InteractionEvents } from './InteractionEvents';
import { KeyboardPan } from 'ol/interaction';

/**
 * KeyboardPan Interaction 이벤트
 *
 * @category Interaction/Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface KeyboardPanInteractionEvents<T extends KeyboardPan> extends InteractionEvents<T> {}
