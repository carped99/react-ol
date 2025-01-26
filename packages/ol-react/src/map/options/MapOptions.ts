import { MapOptions as OLMapOptions } from 'ol/Map.js';
import { BaseObjectOptions } from '../../base/useProperties';
import { MapEvents } from '../events';

/**
 * 지도 옵션
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 *
 * @category Base/Options
 */
export interface MapOptions extends Omit<OLMapOptions, 'target'>, MapEvents {
  properties?: BaseObjectOptions['properties'];
}
