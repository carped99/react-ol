import { InteractionEvents } from './InteractionEvents';
import { Link } from 'ol/interaction';

export type LinkInteractionEvents<T extends Link> = InteractionEvents<T>;
