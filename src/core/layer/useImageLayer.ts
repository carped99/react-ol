import { useCallback, useDebugValue } from 'react';
import ImageLayer from 'ol/layer/Image';
import ImageSource from 'ol/source/Image';
import { ImageLayerOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { useInstanceProviderByKeys } from '../hooks/BaseObjectProvider';
import { useBaseImageLayer } from './base/useBaseImageLayer';

/**
 * {@link ImageLayer}를 생성한다.
 * @param options - {@link ImageLayerOptions}
 *
 * @category Layers
 */
export const useImageLayer = <S extends ImageSource>(options: Readonly<ImageLayerOptions<S>>) => {
  useDebugValue(options);

  const provider = useInstanceProviderByKeys<ImageLayer<S>, ImageLayerOptions<S>>(
    useCallback((options) => new ImageLayer<S>(options), []),
  );

  const instance = useInstance(provider, options);

  useBaseImageLayer(instance, options);

  return instance;
};
