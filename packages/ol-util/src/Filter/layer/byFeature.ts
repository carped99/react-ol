import BaseLayer from 'ol/layer/Base';
import { Feature } from 'ol';

/**
 * @alpha
 * @param feature
 */
export const byFeature = (feature: Feature) => (layer: BaseLayer) =>
  (layer as any).getSource?.()?.hasFeature?.(feature) ?? false;
