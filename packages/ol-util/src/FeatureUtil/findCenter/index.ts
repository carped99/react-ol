import { getCenter } from 'ol/extent';
import { FeatureOrGeometry } from '../../Util/internal';
import { findExtent } from '../findExtent';
import { Coordinate } from 'ol/coordinate';

export const findCenter = (source: FeatureOrGeometry): Coordinate | undefined => {
  const extent = findExtent(source);
  return extent ? getCenter(extent) : undefined;
};
