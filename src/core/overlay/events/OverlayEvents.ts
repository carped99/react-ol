import { BaseEvents } from '../../events/BaseEvents';
import { ObjectEvent } from 'ol/Object';

/**
 * Overlay 이벤트
 *
 * @category Overlay/Event
 */
export interface OverlayEvents<T> extends BaseEvents<T> {
  onChangeElement?: (this: T, e: ObjectEvent) => void;
  onChangeMap?: (this: T, e: ObjectEvent) => void;
  onChangeOffset?: (this: T, e: ObjectEvent) => void;
  onChangePosition?: (this: T, e: ObjectEvent) => void;
  onChangePositioning?: (this: T, e: ObjectEvent) => void;
}
