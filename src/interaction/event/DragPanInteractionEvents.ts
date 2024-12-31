import { InteractionEvents } from './InteractionEvents';
import { DragPan } from 'ol/interaction';

export type DragPanInteractionEvents<T extends DragPan> = InteractionEvents<T>;
