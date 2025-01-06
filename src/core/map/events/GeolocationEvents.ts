import { ObjectEvent } from 'ol/Object';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * Geolocation 이벤트 타입
 *
 * @category Base/Events
 */
export interface GeolocationEvents extends BaseEvents {
  onChangeAccuracy?: (e: ObjectEvent) => void;
  onChangeAccuracyGeometry?: (e: ObjectEvent) => void;
  onChangeAltitude?: (e: ObjectEvent) => void;
  onChangeAltitudeAccuracy?: (e: ObjectEvent) => void;
  onChangeHeading?: (e: ObjectEvent) => void;
  onChangePosition?: (e: ObjectEvent) => void;
  onChangeProjection?: (e: ObjectEvent) => void;
  onChangeSpeed?: (e: ObjectEvent) => void;
  onChangeTracking?: (e: ObjectEvent) => void;
  onChangeTrackingOptions?: (e: ObjectEvent) => void;

  // 동적으로 추가되는 속성
  [key: string]: ((e: any) => void) | undefined;
}
