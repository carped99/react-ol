import { Feature } from 'ol';
import { Geometry as OlGeometry } from 'ol/geom';
import LayerGroup from 'ol/layer/Group';

export type Features<T extends OlGeometry = OlGeometry> = Feature<T> | Feature<T>[];

export const isLayerGroup = (value: unknown): value is LayerGroup => value instanceof LayerGroup;
