import { useDebugValue } from 'react';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import { WebGLTileLayerOptions } from './options';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { useInstance } from '../hooks/useInstance';

/**
 * {@link WebGLTileLayer}를 생성한다.
 * @param options - {@link WebGLTileLayerOptions}
 *
 * @category Layers
 */
export const useWebGLTileLayer = (options: Readonly<WebGLTileLayerOptions>) => {
  useDebugValue(options);

  return useInstance(provider, options);
};

const create = (options: Readonly<WebGLTileLayerOptions>) => new WebGLTileLayer(options);

const provider = createBaseObjectProvider(create);
