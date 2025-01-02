import { useDebugValue, useMemo } from 'react';
import { Options } from 'ol/layer/BaseImage';
import ImageLayer from 'ol/layer/Image';
import ImageSource from 'ol/source/Image';
import { useOlBaseImageLayer } from '@src/layer/base/useOlBaseImageLayer';

/**
 * {@link ImageLayer}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ImageLayerOptions<S extends ImageSource> extends Options<S> {}

/**
 * {@link ImageLayer}를 생성한다.
 * @param options - {@link ImageLayerOptions}
 *
 * @category Layer
 */
export const useOlImageLayer = <S extends ImageSource>(options: Readonly<ImageLayerOptions<S>>) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new ImageLayer<S>(options);
  }, [options]);

  useOlBaseImageLayer(layer, options);

  return layer;
};
