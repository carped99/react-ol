import { ObjectEvent } from 'ol/Object';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * Geolocation 이벤트 타입
 *
 * @category Base/Events
 */
export interface GeolocationEvents<T> extends BaseEvents<T> {
  onChangeAccuracy?: (this: T, e: ObjectEvent) => void;
  onChangeAccuracyGeometry?: (this: T, e: ObjectEvent) => void;
  onChangeAltitude?: (this: T, e: ObjectEvent) => void;
  onChangeAltitudeAccuracy?: (this: T, e: ObjectEvent) => void;
  onChangeHeading?: (this: T, e: ObjectEvent) => void;
  onChangePosition?: (this: T, e: ObjectEvent) => void;
  onChangeProjection?: (this: T, e: ObjectEvent) => void;
  onChangeSpeed?: (this: T, e: ObjectEvent) => void;
  onChangeTracking?: (this: T, e: ObjectEvent) => void;
  onChangeTrackingOptions?: (this: T, e: ObjectEvent) => void;

  // 동적으로 추가되는 속성
  [key: string]: ((this: T, e: any) => void) | undefined;
}
