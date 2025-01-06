import { ObjectEvent } from 'ol/Object';
import { BaseVectorLayerEvents } from './BaseLayerEvents';

/**
 * VectorTileLayer events.
 *
 * @category Layers/Events
 */
export interface VectorTileLayerEvents<T> extends BaseVectorLayerEvents<T> {
  onChangePreload?: (this: T, e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError?: (this: T, e: ObjectEvent) => void;
}
