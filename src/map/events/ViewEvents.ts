import { ObjectEvent } from 'ol/Object';
import { BaseEvents } from '../../events/BaseEvents';

/**
 * View 이벤트 타입
 *
 * @category Base/Events
 */
export interface ViewEvents<T> extends BaseEvents<T> {
  onChangeCenter?: (this: T, e: ObjectEvent) => void;
  onChangeResolution?: (this: T, e: ObjectEvent) => void;
  onChangeRotation?: (this: T, e: ObjectEvent) => void;

  // 동적으로 추가되는 속성
  [key: string]: ((this: T, e: any) => void) | undefined;
}
