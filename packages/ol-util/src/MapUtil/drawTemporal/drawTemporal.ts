import { Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { EventsKey } from 'ol/events';
import { unByKey } from 'ol/Observable';
import RenderEvent from 'ol/render/Event';
import { getVectorContext } from 'ol/render';
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorContext from 'ol/render/VectorContext';
import { Style } from 'ol/style';
import { FrameState } from 'ol/Map';

/**
 * 렌더링 옵션 인터페이스
 */
export type DrawTemporalContext = {
  easing: number;
  elapsed: number;
  resolution: number;
  frameState: FrameState;
  vectorContext: VectorContext;
};

export type DrawTemporalLayer = VectorLayer | VectorImageLayer;

/**
 * 렌더링 콜백 함수 타입
 */
export type DrawTemporalCallback = (context: DrawTemporalContext) => void;

/**
 * 스타일 생성 함수 또는 고정 스타일 타입
 */
export type DrawTemporalStyle<T, S = Style> = ((source: T, context: DrawTemporalContext) => S | undefined) | S;

export interface DrawTemporalConfig {
  duration: number; // 지속 시간 (ms)
  easing?: (t: number) => number; // 이징 함수
  onStart?: () => void; // 시작 콜백
  onFrame?: (elapsed: number) => void; // 프레임 콜백
  onEnd?: () => void; // 종료 콜백
}

/**
 * 지정된 시간 동안 렌더링을 수행합니다.
 * @param map - 맵 인스턴스
 * @param layer - 대상 벡터 레이어
 * @param callback - 렌더링 콜백 함수
 * @param config
 * @returns 애니메이션을 정리하는 함수
 *
 * @example
 * ```ts
 * // Feature 렌더링
 * drawTemporal(map, layer, ({ vectorContext, elapsed }) => {
 *   vectorContext.drawFeature(feature, getStyle(elapsed));
 * }, 1000);
 * ```
 *
 * @example
 * ```ts
 * // Geometry 렌더링
 * drawTemporal(map, layer, ({ vectorContext, elapsed }) => {
 *   vectorContext.drawGeometry(geometry);
 * }, 1000);
 * ```
 *
 * @example
 * ```ts
 * // Circle 렌더링
 * drawTemporal(map, layer, ({ vectorContext, elapsed }) => {
 *   vectorContext.drawCircle(circle, style);
 * }, 1000);
 * ```
 */
export function drawTemporal(
  map: Map,
  layer: DrawTemporalLayer,
  callback: DrawTemporalCallback,
  config: DrawTemporalConfig,
): () => void {
  const { duration, easing = (t: number) => t, onStart, onFrame, onEnd } = config;

  const state: DrawState = {};
  const start = Date.now();
  const fireChanged = layer instanceof VectorImageLayer;

  const renderMap = fireChanged
    ? () => {
        layer.changed();
        map.render();
      }
    : map.render.bind(map);

  onStart?.();

  /**
   * 각 프레임마다 실행되는 애니메이션 함수
   */
  const animateFrame = (event: RenderEvent) => {
    const vectorContext = getVectorContext(event);
    const frameState = event.frameState;

    if (!frameState) {
      cleanupAnimation(state);
      onEnd?.();
      return;
    }

    const elapsed = frameState.time - start;
    if (elapsed > duration) {
      cleanupAnimation(state);
      onEnd?.();
      return;
    }

    const context: DrawTemporalContext = {
      easing: easing(elapsed / duration),
      elapsed,
      resolution: frameState.viewState.resolution,
      frameState,
      vectorContext,
    };

    callback(context);

    onFrame?.(elapsed);

    state.animationFrame = requestAnimationFrame(renderMap);
  };

  state.eventKey = layer.on('postrender', animateFrame);
  map.render();

  return () => {
    cleanupAnimation(state);
    onEnd?.();
  };
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
