import { FeatureFilter } from '../predicate';

export const byId =
  (id: string | number): FeatureFilter =>
  (feature) =>
    feature.getId() === id;
