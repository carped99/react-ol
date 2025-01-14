import { Extent } from 'ol/interaction';
import { Options } from 'ol/interaction/Extent';
import { useInteraction } from './useInteraction';
import { ExtentInteractionEvents } from './event';
import { createInstanceProviderByKey, useInstance } from '../base';

/**
 * Options for the - {@link useExtentInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExtentInteractionOptions extends Options {}

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Extent-Extent.html | Extent}
 * @category Interaction
 */
export const useExtentInteraction = (
  options: ExtentInteractionOptions = {},
  events?: ExtentInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new Extent(options);

const instanceProperties = [
  { name: 'condition', settable: false },
  { name: 'extent', settable: false },
  { name: 'boxStyle', settable: false },
  { name: 'pixelTolerance', settable: false },
  { name: 'pointerStyle', settable: false },
  { name: 'wrapX', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
