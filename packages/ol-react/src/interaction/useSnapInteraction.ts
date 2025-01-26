import Snap, { Options } from 'ol/interaction/Snap.js';
import { createInstanceProviderByKey, useInstance } from '../base';
import { SnapInteractionEvents } from './event';
import { useInteraction } from './useInteraction';

/**
 * Options for the - {@link useSnapInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SnapInteractionOptions extends Options {}

/**
 * Handles snapping of vector features while modifying or drawing them.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Snap-Snap.html | Snap}
 * @category Interaction
 */
export const useSnapInteraction = (
  options: SnapInteractionOptions = {},
  events?: SnapInteractionEvents,
  active = true,
) => {
  if (!options.features && !options.source) {
    throw new Error('snapOptions should have features or source');
  }

  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: SnapInteractionOptions) => new Snap(options);

const instanceProperties = [
  { name: 'features', settable: false },
  { name: 'edge', settable: false },
  { name: 'vertex', settable: false },
  { name: 'pixelTolerance', settable: false },
  { name: 'source', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
