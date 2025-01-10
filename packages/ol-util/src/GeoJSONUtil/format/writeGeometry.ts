import { Geometry as OlGeometry } from 'ol/geom';
import { GeometryCollection } from 'geojson';
import { GeoJSONFormatManager } from '../index';
import { WriteFeatureOptions } from './writeFeature';
import { MapToGeoJSONGeometry } from '../typeGuards/typeMapping';

export const writeGeometry = <T extends OlGeometry>(geometry: T, options?: WriteFeatureOptions<T>) => {
  const format = GeoJSONFormatManager.getFormat(options?.format);
  return format.writeGeometryObject(geometry, options?.options) as
    | MapToGeoJSONGeometry<T>
    | GeometryCollection<MapToGeoJSONGeometry<T>>;
};
