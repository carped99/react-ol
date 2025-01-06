import { Tile as TileSource } from 'ol/source';
import { Options as OMSOptions } from 'ol/source/OSM';
import { Options } from 'ol/layer/BaseTile';

/**
 * {@link OSM} {@link TileLayer}의 옵션
 *
 * @category Layers/Options
 */
export interface OSMLayerOptions extends Omit<Options<TileSource>, 'source'> {
  source?: OMSOptions;
}
