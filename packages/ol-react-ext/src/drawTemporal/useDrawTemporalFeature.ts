import { Feature } from 'ol';
import { DrawTemporalConfig, DrawTemporalLayer, DrawTemporalStyle } from '@carped99/ol-util';
import { useCallback } from 'react';
import { useDrawTemporal } from './useDrawTemporal';

export const useDrawTemporalFeature = () => {
  const drawTemporal = useDrawTemporal();

  return useCallback(
    <F extends Feature = Feature>(
      layer: DrawTemporalLayer,
      source: F | F[],
      style: DrawTemporalStyle<F>,
      config: DrawTemporalConfig,
    ) => {
      const styleFunction = typeof style === 'function' ? style : () => style;
      const features = Array.isArray(source) ? source : [source];

      return drawTemporal(
        layer,
        (context) => {
          for (const feature of features) {
            const styleValue = styleFunction(feature, context);
            if (styleValue) {
              context.vectorContext.drawFeature(feature, styleValue);
            }
          }
        },
        config,
      );
    },
    [drawTemporal],
  );
};
