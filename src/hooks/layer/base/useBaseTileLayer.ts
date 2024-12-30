import BaseTileLayer, { Options } from 'ol/layer/BaseTile';
import { useEffect } from 'react';
import { useLayer } from '@src/hooks/layer/base/useLayer';
import TileSource from 'ol/source/Tile';

export const useBaseTileLayer = <S extends TileSource>(layer: BaseTileLayer<S, any>, options: Readonly<Options<S>>) => {
  useLayer(layer, options);

  useEffect(() => {
    if (options.preload != null && layer.getPreload() !== options.preload) {
      layer.setPreload(options.preload);
    }
  }, [layer, options.preload]);
};
