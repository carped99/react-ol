import Feature from 'ol/Feature.js';
import { Type } from 'ol/geom/Geometry.js';
import { Geometry } from 'ol/geom.js';
import { Predicate } from '../predicate';

export type ByGeometryType<T extends Geometry = Geometry> = Predicate<Feature<T>>;

export const byGeometryType =
  <T extends Geometry>(type: Type): ByGeometryType<T> =>
  (feature) =>
    feature.getGeometry()?.getType() === type;
