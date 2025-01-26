import Feature from 'ol/Feature.js';
import Map from 'ol/Map';
import { drawTemporal, DrawTemporalConfig, DrawTemporalLayer, DrawTemporalStyle } from './drawTemporal';

/**
 * 지정된 시간 동안 피처에 임시 스타일을 적용합니다.
 * @param map - 맵 인스턴스
 * @param layer - 대상 벡터 레이어
 * @param source - Feature 배열
 * @param style - 경과 시간을 기반으로 스타일을 생성하는 함수
 * @param config - Config
 * @returns 애니메이션을 정리하는 함수
 */
export function drawTemporalFeature<F extends Feature = Feature>(
  map: Map,
  layer: DrawTemporalLayer,
  source: F | F[],
  style: DrawTemporalStyle<F>,
  config: DrawTemporalConfig,
): () => void {
  const styleFunction = typeof style === 'function' ? style : () => style;
  const features = Array.isArray(source) ? source : [source];

  return drawTemporal(
    map,
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
}
