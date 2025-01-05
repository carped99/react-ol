import { Options } from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { ExtractedFeatureType } from 'ol/layer/BaseVector';

/**
 * {@link VectorLayer}의 옵션
 *
 * @category Layers/Options
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface VectorLayerOptions<
  S extends VectorSource<F> = VectorSource<any>,
  F extends FeatureLike = ExtractedFeatureType<S>,
> extends Options<S, F> {}
