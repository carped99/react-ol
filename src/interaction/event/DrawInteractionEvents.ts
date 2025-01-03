import { InteractionEvents } from './InteractionEvents';
import { DrawEvent } from 'ol/interaction/Draw';
import { Draw } from 'ol/interaction';

/**
 * Draw Interaction 이벤트
 *
 * @category Interaction Event
 */
export interface DrawInteractionEvents<T extends Draw> extends InteractionEvents<T> {
  onDrawAbort?: (this: T, e: DrawEvent) => void;
  onDrawStart?: (this: T, e: DrawEvent) => void;
  onDrawEnd?: (this: T, e: DrawEvent) => void;
}
