import { DrawTemporalConfig, DrawTemporalLayer, DrawTemporalStyle, DrawTemporalText } from '@carped99/ol-util';
import { useCallback } from 'react';
import { Point } from 'ol/geom';
import { useDrawTemporal } from './useDrawTemporal';

export const useDrawTemporalText = () => {
  const drawTemporal = useDrawTemporal();

  return useCallback(
    (
      layer: DrawTemporalLayer,
      source: DrawTemporalText | DrawTemporalText[],
      style: DrawTemporalStyle<DrawTemporalText>,
      config: DrawTemporalConfig,
    ) => {
      const styleFunction = typeof style === 'function' ? style : () => style;
      const texts = Array.isArray(source) ? source : [source];

      return drawTemporal(
        layer,
        (context) => {
          for (const text of texts) {
            const styleValue = styleFunction(text, context);
            if (styleValue) {
              context.vectorContext.setStyle(styleValue);
              context.vectorContext.drawGeometry(new Point(text.position));
            }
          }
        },
        config,
      );
    },
    [drawTemporal],
  );
};
