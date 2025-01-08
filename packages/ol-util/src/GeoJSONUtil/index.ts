import * as api from './GeoJSONApi';
import * as format from './GeoJSONFormat';
import * as guard from './GeoJSONGuard';

export const GeoJSONUtil = {
  ...api,
  ...format,
  ...guard,
};
