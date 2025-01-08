import { Feature as OlFeature, Feature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
import LayerGroup from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';

export type Nullish<T> = T | null | undefined;
export type Predicate<T> = (value: T) => boolean;
export const AlwaysTrue = () => true;
export type LayerFilter = Predicate<BaseLayer>;

export type Features<T extends OlGeometry = OlGeometry> = Feature<T> | Feature<T>[];
export type FeatureFilter<T extends OlGeometry> = Predicate<OlFeature<T>>;

export const isLayerGroup = (value: any): value is LayerGroup => value instanceof LayerGroup;
