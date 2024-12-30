import { ObjectEvent } from 'ol/Object';
import { BaseVectorLayerEvents } from '@src/hooks/layer/event/BaseTileLayer';

export interface VectorTileLayerEvents<T> extends BaseVectorLayerEvents<T> {
  onChangePreload?: (this: T, e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError ?: (this: T, e: ObjectEvent) => void;
}
