import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { Type } from 'ol/geom/Geometry';
import { Predicate } from '../predicate';

export type ByGeometryType<T extends Geometry = Geometry> = Predicate<Feature<T>>;

export const byGeometryType =
  <T extends Geometry>(type: Type): ByGeometryType<T> =>
  (feature) =>
    feature.getGeometry()?.getType() === type;
