import { useDebugValue, useMemo } from 'react';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import { useBaseTileLayer } from './base/useBaseTileLayer';
import { WebGLTileLayerOptions } from './options';

/**
 * {@link WebGLTileLayer}를 생성한다.
 * @param options - {@link WebGLTileLayerOptions}
 *
 * @category Layers
 */
export const useWebGLTileLayer = (options: Readonly<WebGLTileLayerOptions>) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new WebGLTileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBaseTileLayer(layer, options);

  return layer;
};
