import { ObjectEvent } from 'ol/Object';
import { BaseVectorLayerEvents } from './BaseLayerEvents';

/**
 * VectorTileLayer events.
 *
 * @category Layer Event
 */
export interface VectorTileLayerEvents<T> extends BaseVectorLayerEvents<T> {
  onChangePreload?: (this: T, e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError?: (this: T, e: ObjectEvent) => void;
}
