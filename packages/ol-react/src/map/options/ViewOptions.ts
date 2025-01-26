import { ViewOptions as OLViewOptions } from 'ol/View.js';
import { BaseObjectOptions } from '../../base/useProperties';
import { ViewEvents } from '../events';

/**
 * Options for the view.
 * @see {@link useView}
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 *
 * @category Base/Options
 */
export interface ViewOptions extends OLViewOptions, ViewEvents {
  properties?: BaseObjectOptions['properties'];
}
