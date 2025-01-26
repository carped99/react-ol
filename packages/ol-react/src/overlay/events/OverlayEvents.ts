import { ObjectEvent } from 'ol/Object.js';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * Overlay 이벤트
 *
 * @category Overlay/Event
 */
export interface OverlayEvents extends BaseEvents {
  onChangeElement?: (e: ObjectEvent) => void;
  onChangeMap?: (e: ObjectEvent) => void;
  onChangeOffset?: (e: ObjectEvent) => void;
  onChangePosition?: (e: ObjectEvent) => void;
  onChangePositioning?: (e: ObjectEvent) => void;
}
