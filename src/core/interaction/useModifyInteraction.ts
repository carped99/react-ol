import { Modify } from 'ol/interaction';
import { Options } from 'ol/interaction/Modify';
import { useInteraction } from './useInteraction';
import { ModifyInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/BaseObjectProvider';

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
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: Options) => {
  return new Modify(options);
};

const provider = createInstanceProviderByKey(create, [], []);
