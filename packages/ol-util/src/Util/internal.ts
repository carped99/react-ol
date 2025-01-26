import OlFeature from 'ol/Feature.js';
import { Geometry as OlGeometry } from 'ol/geom.js';

export type FeatureOrGeometry = OlFeature | OlGeometry | (OlFeature | OlGeometry)[];

/**
 * Feature 또는 Geometry에서 Geometry를 추출
 */
export const resolveGeometry = (input?: FeatureOrGeometry): OlGeometry[] => {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input
      .map((item) => (item instanceof OlFeature ? item.getGeometry() : item))
      .filter((geometry): geometry is OlGeometry => geometry != undefined);
  }

  const geometry = input instanceof OlFeature ? input.getGeometry() : input;
  return geometry ? [geometry] : [];
};
