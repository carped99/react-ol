import { Modify } from 'ol/interaction';
import { Options } from 'ol/interaction/Modify';
import { useInteraction } from './useInteraction';
import { ModifyInteractionEvents } from './event';
import { createInstanceProviderByKey, useInstance } from '../base';

/**
 * Options for the - {@link useModifyInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModifyInteractionOptions extends Options {}

/**
 * Interaction for modifying feature geometries.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Modify-Modify.html | Modify}
 * @category Interaction
 */
export const useModifyInteraction = (
  options: ModifyInteractionOptions,
  events?: ModifyInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new Modify(options);

const instanceProperties = [
  { name: 'condition', settable: true },
  { name: 'deleteCondition', settable: true },
  { name: 'insertVertexCondition', settable: true },
  { name: 'pixelTolerance', settable: true },
  { name: 'style', settable: true },
  { name: 'source', settable: false },
  { name: 'hitDetection', settable: false },
  { name: 'features', settable: false },
  { name: 'wrapX', settable: false },
  { name: 'snapToPointer', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
