import { useDebugValue } from 'react';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import { WebGLTileLayerOptions } from './options';
import { createInstanceProviderByKey } from '../hooks/BaseObjectProvider';
import { useInstance } from '../hooks/useInstance';
import { useBaseTileLayer } from './base/useBaseTileLayer';
import { BaseTileLayerInstanceProperties } from './base/ObservableProperties';

/**
 * {@link WebGLTileLayer}를 생성한다.
 * @param options - {@link WebGLTileLayerOptions}
 *
 * @category Layers
 */
export const useWebGLTileLayer = (options: Readonly<WebGLTileLayerOptions>) => {
  useDebugValue(options);

  const instance = useInstance(provider, options);

  useBaseTileLayer(instance, options);

  return instance;
};

const create = (options: Readonly<WebGLTileLayerOptions>) => new WebGLTileLayer(options);

const instanceProperties = [
  ...BaseTileLayerInstanceProperties,
  { name: 'style', settable: true, nullable: true },
] as const;

const provider = createInstanceProviderByKey(create, instanceProperties);
