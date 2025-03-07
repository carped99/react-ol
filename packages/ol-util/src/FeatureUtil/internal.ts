import Collection from 'ol/Collection.js';
import OlFeature from 'ol/Feature.js';
import { Geometry as OlGeometry } from 'ol/geom.js';
import VectorSource from 'ol/source/Vector.js';
import { isCollection, isVectorSource } from './typeGuards';

// 타입 정의
export type FeatureSources<T extends OlGeometry> =
  | readonly OlFeature<T>[]
  | Collection<OlFeature<T>>
  | VectorSource<OlFeature<T>>;

export const resolveFeatureArray = <T extends OlGeometry>(source: FeatureSources<T>): OlFeature<T>[] => {
  if (Array.isArray(source)) {
    return source;
  } else if (isVectorSource<T>(source)) {
    return source.getFeatures();
  } else if (isCollection<T>(source)) {
    return source.getArray();
  }
  throw new TypeError(`Invalid feature source type: ${source?.constructor?.name ?? typeof source}`);
};
