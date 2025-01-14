import { useDebugValue } from 'react';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import { WebGLTileLayerOptions } from './options';
import { useBaseTileLayer } from './base/useBaseTileLayer';
import { BaseTileLayerInstanceProperties } from './base/ObservableProperties';
import { WebGLTileLayerEvents } from './events';
import { useEvents } from '../events';
import { createInstanceProviderByKey, useInstance } from '../base';

/**
 * {@link WebGLTileLayer}를 생성한다.
 * @param options - {@link WebGLTileLayerOptions}
 * @param events - 이벤트 목록
 * @category Layers
 */
export const useWebGLTileLayer = (options: Readonly<WebGLTileLayerOptions>, events?: WebGLTileLayerEvents) => {
  useDebugValue(options);

  const instance = useInstance(provider, options);

  useEvents(instance, events);

  useBaseTileLayer(instance, options);

  return instance;
};

const createInstance = (options: Readonly<WebGLTileLayerOptions>) => new WebGLTileLayer(options);

const instanceProperties = [
  ...BaseTileLayerInstanceProperties,
  { name: 'style', settable: true, nullable: true },
] as const;

const provider = createInstanceProviderByKey(createInstance, instanceProperties);
