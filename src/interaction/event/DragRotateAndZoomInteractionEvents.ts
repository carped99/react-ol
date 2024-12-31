import { InteractionEvents } from './InteractionEvents';
import { DragRotateAndZoom } from 'ol/interaction';

export type DragRotateAndZoomInteractionEvents<T extends DragRotateAndZoom> = InteractionEvents<T>;
