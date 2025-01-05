import { Snap } from 'ol/interaction';
import { Options } from 'ol/interaction/Snap';
import { useInteraction } from './useInteraction';
import { SnapInteractionEvents } from './event';
import { useBaseObject } from '../hooks/useBaseObject';

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
  events?: SnapInteractionEvents<Snap>,
  active = true,
) => {
  if (!options.features && !options.source) {
    throw new Error('snapOptions should have features or source');
  }

  const interaction = useBaseObject(options, create, createKeys, []);

  useInteraction(interaction, events, active);

  return interaction;
};

const create = (options?: SnapInteractionOptions) => {
  return new Snap(options);
};

const createKeys = ['features', 'edge', 'vertex', 'pixelTolerance'] as const;
