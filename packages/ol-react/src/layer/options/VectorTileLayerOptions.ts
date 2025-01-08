import { ExtractedFeatureType, Options } from 'ol/layer/VectorTile';
import VectorTile from 'ol/source/VectorTile';
import { FeatureLike } from 'ol/Feature';

/**
 * {@link VectorTileLayer}의 옵션
 *
 * @category Layers/Options
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorTileLayerOptions<
  S extends VectorTile<F> = VectorTile<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}
