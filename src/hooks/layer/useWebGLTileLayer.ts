import { useMemo } from 'react';
import WebGLTileLayer, { Options } from 'ol/layer/WebGLTile';
import { useBaseTileLayer } from '@src/hooks/layer/base/useBaseTileLayer';

export type WebGLTileLayerOptions = Options;

/**
 * {@link WebGLTileLayer}를 생성한다.
 * @param options {@link WebGLTileLayerOptions}
 */
export const useWebGLTileLayer = (options: Readonly<WebGLTileLayerOptions>) => {
  const layer = useMemo(() => {
    return new WebGLTileLayer(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBaseTileLayer(layer, options);

  return layer;
};
