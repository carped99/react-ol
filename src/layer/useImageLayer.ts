import { useMemo } from 'react';
import { Options } from 'ol/layer/BaseImage';
import ImageLayer from 'ol/layer/Image';
import ImageSource from 'ol/source/Image';
import { useBaseImageLayer } from '@src/layer/base/useBaseImageLayer';

export type ImageLayerOptions<S extends ImageSource> = Options<S> & {};

/**
 * {@link ImageLayer}를 생성한다.
 * @param options {@link ImageLayerOptions}
 */
export const useImageLayer = <S extends ImageSource>(options: Readonly<ImageLayerOptions<S>>) => {
  const layer = useMemo(() => {
    return new ImageLayer<S>(options);
  }, [options]);

  useBaseImageLayer(layer, options);

  return layer;
};
