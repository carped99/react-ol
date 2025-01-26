import BaseTileLayer, { Options } from 'ol/layer/BaseTile.js';
import TileSource from 'ol/source/Tile.js';
import { useEffect } from 'react';
import { useLayer } from './useLayer';

export const useBaseTileLayer = <S extends TileSource>(layer: BaseTileLayer<S, any>, options: Readonly<Options<S>>) => {
  useLayer(layer, options);

  useEffect(() => {
    if (options.preload != null && layer.getPreload() !== options.preload) {
      layer.setPreload(options.preload);
    }
  }, [layer, options.preload]);
};
