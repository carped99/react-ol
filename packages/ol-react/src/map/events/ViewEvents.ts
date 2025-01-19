import { ObjectEvent } from 'ol/Object';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * View 이벤트 타입
 *
 * @category Base/Events
 */
export interface ViewEvents extends BaseEvents {
  onChangeCenter?: (e: ObjectEvent) => void;
  onChangeResolution?: (e: ObjectEvent) => void;
  onChangeRotation?: (e: ObjectEvent) => void;
}
