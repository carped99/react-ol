import { Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { Style } from 'ol/style';
import { EventsKey } from 'ol/events';
import { unByKey } from 'ol/Observable';
import RenderEvent from 'ol/render/Event';
import { getVectorContext } from 'ol/render';
import VectorImageLayer from 'ol/layer/VectorImage';

/**
 * 피처의 임시 스타일을 생성하는 함수 타입
 */
export type DrawTemporalFeatureStyle<F extends Feature = Feature> = (
  feature: F,
  options: {
    elapsed: number;
    resolution: number;
  },
) => Style | undefined;

export type DrawTemporalFeatureLayer = VectorLayer | VectorImageLayer;

/**
 * 지정된 시간 동안 피처에 임시 스타일을 적용합니다.
 * @param map - OpenLayers 맵 인스턴스
 * @param layer - 대상 벡터 레이어
 * @param features - Feature 배열
 * @param style - 경과 시간을 기반으로 스타일을 생성하는 함수
 * @param duration - 스타일 적용 지속 시간 (밀리초)
 * @returns 애니메이션을 정리하는 함수
 */
export function drawTemporalFeature<F extends Feature = Feature>(
  map: Map,
  layer: DrawTemporalFeatureLayer,
  features: F[],
  style: DrawTemporalFeatureStyle<F> | Style,
  duration: number,
): () => void {
  const state: DrawState = {};
  const start = Date.now();
  const fireChanged = layer instanceof VectorImageLayer;
  const styleFunction = typeof style === 'function' ? style : () => style;

  const renderCallback = () => {
    if (fireChanged) {
      layer.changed();
    }
    map.render();
  };

  /**
   * 각 프레임마다 실행되는 애니메이션 함수
   */
  const animateFrame = (event: RenderEvent) => {
    const vectorContext = getVectorContext(event);
    const frameState = event.frameState;

    if (!frameState) {
      cleanupAnimation(state);
      return;
    }

    const elapsed = frameState.time - start;
    if (elapsed > duration) {
      cleanupAnimation(state);
      return;
    }

    const options = {
      elapsed,
      resolution: frameState.viewState.resolution,
    };

    for (const feature of features) {
      const styleValue = styleFunction(feature, options);

      if (styleValue) {
        vectorContext.drawFeature(feature, styleValue);
      }
    }

    state.animationFrame = requestAnimationFrame(renderCallback);
  };

  state.eventKey = layer.on('postrender', animateFrame);
  map.render();

  return () => cleanupAnimation(state);
}

interface DrawState {
  eventKey?: EventsKey;
  animationFrame?: number;
}

/**
 * 정리 함수
 */
const cleanupAnimation = (state: DrawState): void => {
  if (state.eventKey != null) {
    unByKey(state.eventKey);
    state.eventKey = undefined;
  }
  if (state.animationFrame != null) {
    cancelAnimationFrame(state.animationFrame);
    state.animationFrame = undefined;
  }
};
