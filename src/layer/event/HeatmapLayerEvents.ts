import { ObjectEvent } from 'ol/Object';
import { BaseVectorLayerEvents } from './BaseLayerEvents';

/**
 * Heatmap 레이어 이벤트 타입
 *
 * @category Layer Event
 */
export interface HeatmapLayerEvents<T> extends BaseVectorLayerEvents<T> {
  onChangeBlur?: (this: T, e: ObjectEvent) => void;
  onChangeGradient?: (this: T, e: ObjectEvent) => void;
  onChangeRadius?: (this: T, e: ObjectEvent) => void;
}
