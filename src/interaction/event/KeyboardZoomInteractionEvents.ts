import { InteractionEvents } from './InteractionEvents';
import { KeyboardZoom } from 'ol/interaction';

/**
 * KeyboardZoom Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface KeyboardZoomInteractionEvents<T extends KeyboardZoom> extends InteractionEvents<T> {}
