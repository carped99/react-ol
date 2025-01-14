import { ViewOptions as OLViewOptions } from 'ol/View';
import { BaseObjectOptions } from '../../base/useProperties';

/**
 * Options for the view.
 * @see {@link useView}
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html | Map}
 *
 * @category Base/Options
 */
export interface ViewOptions extends OLViewOptions {
  properties?: BaseObjectOptions['properties'];
}
