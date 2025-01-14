import { useCallback, useDebugValue } from 'react';
import ImageLayer from 'ol/layer/Image';
import ImageSource from 'ol/source/Image';
import { ImageLayerOptions } from './options';
import { useBaseImageLayer } from './base/useBaseImageLayer';
import { BaseImageLayerInstanceProperties } from './base/ObservableProperties';
import { ImageLayerEvents } from './events';
import { useEvents } from '../events';
import { useInstance, useInstanceProviderByKeys } from '../base';

/**
 * {@link ImageLayer}를 생성한다.
 * @param options - {@link ImageLayerOptions}
 * @param events - 이벤트 목록
 * @category Layers
 */
export const useImageLayer = <S extends ImageSource>(
  options: Readonly<ImageLayerOptions<S>>,
  events?: ImageLayerEvents,
) => {
  useDebugValue(options);

  const provider = useInstanceProviderByKeys<ImageLayer<S>, ImageLayerOptions<S>>(
    useCallback((options) => new ImageLayer<S>(options), []),
    instanceProperties,
  );

  const instance = useInstance(provider, options);

  useEvents(instance, events);

  useBaseImageLayer(instance, options);

  return instance;
};

const instanceProperties = [...BaseImageLayerInstanceProperties] as const;
