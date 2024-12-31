import { InteractionEvents } from './InteractionEvents';
import { DragRotate } from 'ol/interaction';

export type DragRotateInteractionEvents<T extends DragRotate> = InteractionEvents<T>;
