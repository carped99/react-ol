import WebGLTileLayer, { Options } from 'ol/layer/WebGLTile.js';
import { useDebugValue } from 'react';
import { createInstanceProviderByKey, useInstance } from '../base';
import { useEvents } from '../events';
import { BaseTileLayerInstanceProperties } from './base/LayerProperties';
import { useBaseTileLayer } from './base/useBaseTileLayer';
import { WebGLTileLayerEvents } from './events';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebGLTileLayerOptions extends Options {}

/**
 * {@link WebGLTileLayer}를 생성한다.
 * @param options - {@link WebGLTileLayerOptions}
 * @param events - 이벤트 목록
 * @category Layers
 */
export const useWebGLTileLayer = (options: Readonly<WebGLTileLayerOptions>, events?: WebGLTileLayerEvents) => {
  useDebugValue(options);

  const instance = useInstance(instanceProvider, options);

  useEvents(instance, events);

  useBaseTileLayer(instance, options);

  return instance;
};

const createInstance = (options: Readonly<WebGLTileLayerOptions>) => new WebGLTileLayer(options);

const instanceProperties = [
  ...BaseTileLayerInstanceProperties,
  { name: 'style', settable: true, nullable: true },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
