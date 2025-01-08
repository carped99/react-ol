import { MapOptions as OLMapOptions } from 'ol/Map';
import { BaseObjectOptions } from '../../hooks/useProperties';

/**
 * 지도 옵션
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 *
 * @category Base/Options
 */
export interface MapOptions extends Omit<OLMapOptions, 'target'> {
  properties?: BaseObjectOptions['properties'];
}
