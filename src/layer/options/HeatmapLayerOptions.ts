import { Options } from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import { FeatureLike } from 'ol/Feature';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

/**
 * {@link HeatmapLayer}의 옵션
 *
 * @category Layers/Options
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeatmapLayerOptions<
  F extends FeatureLike = Feature<Geometry>,
  S extends VectorSource<F> = VectorSource<F>,
> extends Options<F, S> {}
