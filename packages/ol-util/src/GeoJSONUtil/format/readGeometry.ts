import { Geometry } from 'geojson';
import { ReadFeatureOptions } from './readFeature';
import { GeoJSONFormatManager } from '../index';
import { MapToOlGeometry } from '../typeGuards/typeMapping';

export const readGeometry = <T extends Geometry>(source: T, options?: ReadFeatureOptions): MapToOlGeometry<T> => {
  const format = GeoJSONFormatManager.getFormat(options?.format);
  return format.readGeometry(source, options?.options) as MapToOlGeometry<T>;
};
