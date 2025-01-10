import * as format from './format';
import * as typeGuards from './typeGuards';
import { GeoJSONManager } from './format/manager';

export const GeoJSONFormatManager = new GeoJSONManager();

export const GeoJSONUtil: typeof format & typeof typeGuards = {
  ...format,
  ...typeGuards,
};
