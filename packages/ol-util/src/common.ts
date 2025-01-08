import { Feature as OlFeature, Feature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';

export type Nullish<T> = T | null | undefined;
export type Predicate<T> = (value: T) => boolean;
export const AlwaysTrue = () => true;

export type Features<T extends OlGeometry = OlGeometry> = Feature<T> | Feature<T>[];
export type FeatureFilter<T extends OlGeometry> = Predicate<OlFeature<T>>;
