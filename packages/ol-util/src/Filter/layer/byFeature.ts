import Feature from 'ol/Feature.js';
import BaseLayer from 'ol/layer/Base.js';

/**
 * @alpha
 * @param feature - 비교할 피처
 */
export const byFeature = (feature: Feature) => (layer: BaseLayer) =>
  (layer as any).getSource?.()?.hasFeature?.(feature) ?? false;
