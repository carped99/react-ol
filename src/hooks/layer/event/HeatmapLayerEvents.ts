import { ObjectEvent } from 'ol/Object';
import { BaseVectorLayerEvents } from '@src/hooks/layer/event/BaseTileLayer';

export interface HeatmapLayerEvents<T> extends BaseVectorLayerEvents<T> {
  onChangeBlur?: (this: T, e: ObjectEvent) => void;
  onChangeGradient ?: (this: T, e: ObjectEvent) => void;
  onChangeRadius ?: (this: T, e: ObjectEvent) => void;
}
