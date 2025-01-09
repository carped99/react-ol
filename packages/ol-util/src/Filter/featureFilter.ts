import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { Type } from 'ol/geom/Geometry';
import { Predicate } from './api';
import { commonFilters } from './type';

export type FeatureFilter<T extends Geometry = Geometry> = Predicate<Feature<T>>;

const byId =
  (id: string | number): FeatureFilter =>
  (feature) =>
    feature.getId() === id;

const byGeometryType =
  <T extends Geometry>(type: Type): FeatureFilter<T> =>
  (feature) =>
    feature.getGeometry()?.getType() === type;

/**
 * 자주 사용되는 필터 모음
 */
export const FeatureFilters = {
  ...commonFilters,
  byId,
  byGeometryType,
} as const;
