import { useDebugValue, useMemo } from 'react';
import WebGLTileLayer, { Options } from 'ol/layer/WebGLTile';
import { useOlBaseTileLayer } from '@src/layer/base/useOlBaseTileLayer';

/**
 * {@link WebGLTileLayer}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WebGLTileLayerOptions extends Options {}

/**
 * {@link WebGLTileLayer}를 생성한다.
 * @param options - {@link WebGLTileLayerOptions}
 *
 * @category Layer
 */
export const useOlWebGLTileLayer = (options: Readonly<WebGLTileLayerOptions>) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new WebGLTileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOlBaseTileLayer(layer, options);

  return layer;
};
