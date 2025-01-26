import { Options } from 'ol/Geolocation.js';
import { GeolocationEvents } from '../events';

/**
 * Options for the - {@link useGeolocation} hook.
 *
 * @category Base/Options
 */

export interface GeolocationOptions extends Options, GeolocationEvents {}
