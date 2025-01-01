import { OlInteractionEvents } from './OlInteractionEvents';
import { Link } from 'ol/interaction';

/**
 * Link Interaction 이벤트
 *
 * @category Interaction Event
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlLinkInteractionEvents<T extends Link> extends OlInteractionEvents<T> {}
