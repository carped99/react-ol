import { ObjectEvent } from 'ol/Object.js';
import { BaseVectorLayerEvents } from './BaseLayerEvents';

/**
 * Heatmap 레이어 이벤트 타입
 *
 * @category Layers/Events
 */
export interface HeatmapLayerEvents extends BaseVectorLayerEvents {
  onChangeBlur?: (e: ObjectEvent) => void;
  onChangeGradient?: (e: ObjectEvent) => void;
  onChangeRadius?: (e: ObjectEvent) => void;
}
