import { ObjectEvent } from 'ol/Object.js';
import { BaseVectorLayerEvents } from './BaseLayerEvents';

/**
 * VectorTileLayer events.
 *
 * @category Layers/Events
 */
export interface VectorTileLayerEvents extends BaseVectorLayerEvents {
  onChangePreload?: (e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError?: (e: ObjectEvent) => void;
}
