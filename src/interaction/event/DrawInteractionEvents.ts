import { InteractionEvents } from './InteractionEvents';
import { DrawEvent } from 'ol/interaction/Draw';
import { Draw } from 'ol/interaction';

export interface DrawInteractionEvents<T extends Draw> extends InteractionEvents<T> {
  onDrawAbort?: (this: T, e: DrawEvent) => void;
  onDrawStart?: (this: T, e: DrawEvent) => void;
  onDrawEnd?: (this: T, e: DrawEvent) => void;
}
