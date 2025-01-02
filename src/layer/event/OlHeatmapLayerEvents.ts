import { ObjectEvent } from 'ol/Object';
import { OlBaseVectorLayerEvents } from '@src/layer/event/OlBaseLayerEvents';

/**
 * Heatmap 레이어 이벤트 타입
 *
 * @category Layer Event
 */
export interface OlHeatmapLayerEvents<T> extends OlBaseVectorLayerEvents<T> {
  onChangeBlur?: (this: T, e: ObjectEvent) => void;
  onChangeGradient?: (this: T, e: ObjectEvent) => void;
  onChangeRadius?: (this: T, e: ObjectEvent) => void;
}
