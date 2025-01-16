import { DrawTemporalConfig, DrawTemporalLayer, DrawTemporalStyle } from '@carped99/ol-util';
import { useCallback } from 'react';
import { useDrawTemporal } from './useDrawTemporal';
import { Geometry } from 'ol/geom';

export const useDrawTemporalGeometry = () => {
  const drawTemporal = useDrawTemporal();

  return useCallback(
    <F extends Geometry = Geometry>(
      layer: DrawTemporalLayer,
      source: F | F[],
      style: DrawTemporalStyle<F>,
      config: DrawTemporalConfig,
    ) => {
      const styleFunction = typeof style === 'function' ? style : () => style;
      const geometries = Array.isArray(source) ? source : [source];

      return drawTemporal(
        layer,
        (context) => {
          for (const geometry of geometries) {
            const styleValue = styleFunction(geometry, context);
            if (styleValue) {
              context.vectorContext.setStyle(styleValue);
              context.vectorContext.drawGeometry(geometry);
            }
          }
        },
        config,
      );
    },
    [drawTemporal],
  );
};
