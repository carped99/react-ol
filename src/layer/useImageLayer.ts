import { useDebugValue, useMemo } from 'react';
import ImageLayer from 'ol/layer/Image';
import ImageSource from 'ol/source/Image';
import { useBaseImageLayer } from './base/useBaseImageLayer';
import { ImageLayerOptions } from './options';

/**
 * {@link ImageLayer}를 생성한다.
 * @param options - {@link ImageLayerOptions}
 *
 * @category Layers
 */
export const useImageLayer = <S extends ImageSource>(options: Readonly<ImageLayerOptions<S>>) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new ImageLayer<S>(options);
  }, [options]);

  useBaseImageLayer(layer, options);

  return layer;
};
