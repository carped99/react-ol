import { InteractionEvents } from './InteractionEvents';
import { DoubleClickZoom } from 'ol/interaction';

export type DblClickZoomInteractionEvents<T extends DoubleClickZoom> = InteractionEvents<T>;
