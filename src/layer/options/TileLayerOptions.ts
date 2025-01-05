import { Tile as TileSource } from 'ol/source';
import { Options } from 'ol/layer/BaseTile';
import { Tile } from 'ol';

/**
 * {@link TileLayer}의 옵션
 *
 * @category Layers/Options
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TileLayerOptions<S extends TileSource = TileSource<Tile>> extends Options<S> {}
