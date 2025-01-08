import * as mapUtils from './MapUtil';
import * as featureUtils from './FeatureUtil';
import * as geometryUtils from './GeometryUtil';
import * as geoJSONUtils from './GeoJSONUtil';
import * as geoJSONFormat from './GeoJSONFormat';

export const MapUtil = {
  ...mapUtils,
};

export const GeometryUtil = {
  ...geoJSONFormat,
  ...geometryUtils,
};

export const FeatureUtil = {
  ...featureUtils,
};

export const GeoJSONUtil = {
  ...geoJSONUtils,
};
