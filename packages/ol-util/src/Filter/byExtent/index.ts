import { FeatureFilter } from '../predicate';
import { Extent } from 'ol/extent';
import { FeatureSources } from '../../FeatureUtil/internal';
import { isFeatureCollection, isVectorSource } from '../../FeatureUtil/typeGuards';
import { Geometry as OlGeometry } from 'ol/geom';

export const byExtent = <T extends OlGeometry>(source: FeatureSources<T>, extent: Extent): FeatureFilter => {
  if (Array.isArray(source)) {
    source.filter();
  } else if (isVectorSource<T>(source)) {
    source.getFeaturesInExtent(extent);
  } else if (isFeatureCollection<T>(source)) {
  }
};
