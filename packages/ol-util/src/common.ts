import Feature from 'ol/Feature.js';
import { Geometry as OlGeometry } from 'ol/geom.js';
import LayerGroup from 'ol/layer/Group.js';

export type Features<T extends OlGeometry = OlGeometry> = Feature<T> | Feature<T>[];

export const isLayerGroup = (value: unknown): value is LayerGroup => value instanceof LayerGroup;
