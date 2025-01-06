import { MapOptions, ViewOptions } from '.';

/**
 * @category Base/Options
 */
export interface MapViewOptions extends Omit<MapOptions, 'view'> {
  view: ViewOptions;
}
