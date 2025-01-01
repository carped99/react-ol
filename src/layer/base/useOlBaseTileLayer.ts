import BaseTileLayer, { Options } from 'ol/layer/BaseTile';
import { useEffect } from 'react';
import TileSource from 'ol/source/Tile';
import { useOlLayer } from './useOlLayer';

export const useOlBaseTileLayer = <S extends TileSource>(
  layer: BaseTileLayer<S, any>,
  options: Readonly<Options<S>>,
) => {
  useOlLayer(layer, options);

  useEffect(() => {
    if (options.preload != null && layer.getPreload() !== options.preload) {
      layer.setPreload(options.preload);
    }
  }, [layer, options.preload]);
};
