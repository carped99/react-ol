import { Geometry } from 'ol/geom.js';
import Map from 'ol/Map.js';
import { drawTemporal, DrawTemporalConfig, DrawTemporalLayer, DrawTemporalStyle } from './drawTemporal';

export function drawTemporalGeometry<G extends Geometry = Geometry>(
  map: Map,
  layer: DrawTemporalLayer,
  source: G | G[],
  style: DrawTemporalStyle<G>,
  config: DrawTemporalConfig,
): () => void {
  const styleFunction = typeof style === 'function' ? style : () => style;
  const geometries = Array.isArray(source) ? source : [source];

  return drawTemporal(
    map,
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
}
