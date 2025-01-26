import { Coordinate } from 'ol/coordinate.js';
import { Point } from 'ol/geom.js';
import Map from 'ol/Map.js';
import { Options } from 'ol/style/Text.js';
import { drawTemporal, DrawTemporalConfig, DrawTemporalLayer, DrawTemporalStyle } from './drawTemporal';

/**
 * 텍스트 렌더링을 위한 설정 타입
 */
export interface DrawTemporalText {
  text: string;
  position: Coordinate;
  options?: Options;
}

export function drawTemporalText(
  map: Map,
  layer: DrawTemporalLayer,
  source: DrawTemporalText | DrawTemporalText[],
  style: DrawTemporalStyle<DrawTemporalText>,
  config: DrawTemporalConfig,
): () => void {
  const styleFunction = typeof style === 'function' ? style : () => style;
  const texts = Array.isArray(source) ? source : [source];

  return drawTemporal(
    map,
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
}
