import BaseLayer, { Options as BaseOptions } from 'ol/layer/Base.js';
import { useEffect } from 'react';
import { useProperties } from '../../base/useProperties';

export const useBaseLayer = (layer: BaseLayer, options: Readonly<BaseOptions>) => {
  useProperties(layer, options);

  useEffect(() => {
    if (layer == null) throw new Error('layer is required');
  }, [layer]);
};
