import { Options } from 'ol/layer/BaseImage.js';
import ImageLayer from 'ol/layer/Image.js';
import ImageSource from 'ol/source/Image.js';
import { useCallback, useDebugValue } from 'react';
import { useInstance, useInstanceProviderByKeys } from '../base';
import { useEvents } from '../events';
import { BaseImageLayerInstanceProperties } from './base/LayerProperties';
import { useBaseImageLayer } from './base/useBaseImageLayer';
import { ImageLayerEvents } from './events';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ImageLayerOptions<S extends ImageSource> extends Options<S> {}

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
