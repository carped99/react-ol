import { InteractionEvents } from './InteractionEvents';
import { Link } from 'ol/interaction';

/**
 * Link Interaction 이벤트
 *
 * @category Interaction/Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LinkInteractionEvents<T extends Link> extends InteractionEvents<T> {}
