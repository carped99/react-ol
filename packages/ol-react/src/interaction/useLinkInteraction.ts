import { Link } from 'ol/interaction';
import { Options } from 'ol/interaction/Link';
import { useInteraction } from './useInteraction';
import { LinkInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/InstanceProviderByProperties';

/**
 * Options for the - {@link useLinkInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LinkInteractionOptions extends Options {}

/**
 * An interaction that synchronizes the map state with the UL.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Link-Link.html | Link}
 * @category Interaction
 */
export const useLinkInteraction = (
  options: LinkInteractionOptions = {},
  events?: LinkInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new Link(options);

const instanceProperties = [
  { name: 'animate', settable: false },
  { name: 'params', settable: false },
  { name: 'replace', settable: false },
  { name: 'prefix', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
