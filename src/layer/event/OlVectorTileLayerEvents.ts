import { ObjectEvent } from 'ol/Object';
import { OlBaseVectorLayerEvents } from '@src/layer/event/OlBaseLayerEvents';

/**
 * VectorTileLayer events.
 *
 * @category Event
 */
export interface OlVectorTileLayerEvents<T> extends OlBaseVectorLayerEvents<T> {
  onChangePreload?: (this: T, e: ObjectEvent) => void;
  onChangeUseInterimTilesOnError?: (this: T, e: ObjectEvent) => void;
}
