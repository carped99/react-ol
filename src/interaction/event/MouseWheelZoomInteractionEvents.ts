import { InteractionEvents } from './InteractionEvents';
import { MouseWheelZoom } from 'ol/interaction';

export type MouseWheelZoomInteractionEvents<T extends MouseWheelZoom> = InteractionEvents<T>;
