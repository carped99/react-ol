import { InteractionEvents } from './InteractionEvents';
import { PinchRotate } from 'ol/interaction';

export type PinchRotateInteractionEvents<T extends PinchRotate> = InteractionEvents<T>;
