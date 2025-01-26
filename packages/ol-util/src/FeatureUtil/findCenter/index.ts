import { Coordinate } from 'ol/coordinate.js';
import { getCenter } from 'ol/extent.js';
import { FeatureOrGeometry } from '../../Util/internal';
import { findExtent } from '../findExtent';

export const findCenter = (source: FeatureOrGeometry): Coordinate | undefined => {
  const extent = findExtent(source);
  return extent ? getCenter(extent) : undefined;
};
