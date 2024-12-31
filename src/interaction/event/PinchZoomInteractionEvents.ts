import { InteractionEvents } from './InteractionEvents';
import { PinchZoom } from 'ol/interaction';

export type PinchZoomInteractionEvents<T extends PinchZoom> = InteractionEvents<T>;
