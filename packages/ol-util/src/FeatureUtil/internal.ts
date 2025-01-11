import { Geometry as OlGeometry } from 'ol/geom';
import { Collection, Feature as OlFeature } from 'ol';
import { isFeatureCollection, isVectorSource } from './typeGuards';
import VectorSource from 'ol/source/Vector';

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
  } else if (isFeatureCollection<T>(source)) {
    return source.getArray();
  }
  throw new TypeError(`Invalid feature source type: ${source?.constructor?.name ?? typeof source}`);
};
