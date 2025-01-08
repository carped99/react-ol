import { Options } from 'ol/layer/BaseImage';
import ImageSource from 'ol/source/Image';

/**
 * {@link ImageLayer}의 옵션
 *
 * @category Layers/Options
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ImageLayerOptions<S extends ImageSource> extends Options<S> {}
