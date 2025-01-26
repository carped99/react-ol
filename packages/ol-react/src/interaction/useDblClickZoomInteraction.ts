import DoubleClickZoom, { Options } from 'ol/interaction/DoubleClickZoom.js';
import { createInstanceProviderByKey, useInstance } from '../base';
import { DblClickZoomInteractionEvents } from './event';
import { useInteraction } from './useInteraction';

/**
 * Options for the - {@link useDblClickZoomInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DblClickZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom by double-clicking on the map.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DoubleClickZoom-DoubleClickZoom.html | DoubleClickZoom}.
 * @category Interaction
 */
export const useDblClickZoomInteraction = (
  options: DblClickZoomInteractionOptions = {},
  events?: DblClickZoomInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new DoubleClickZoom(options);

const instanceProperties = [{ name: 'duration' }, { name: 'delta' }] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
