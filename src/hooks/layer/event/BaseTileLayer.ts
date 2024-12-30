import { ObjectEvent } from 'ol/Object';
import { LayerEvents } from '@src/hooks/layer/event/LayerEvents';

export interface BaseVectorLayerEvents<T> extends LayerEvents<T> {
  onChangePreload?: (this: T, e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError ?: (this: T, e: ObjectEvent) => void;
}
