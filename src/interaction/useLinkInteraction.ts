import { useMemo } from 'react';
import { Link } from 'ol/interaction';
import { Options } from 'ol/interaction/Link';
import { useInteraction } from './useInteraction';
import { LinkInteractionEvents } from './event';

/**
 * Options for the {@link useLinkInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LinkInteractionOptions extends Options {}

/**
 * An interaction that synchronizes the map state with the UL.
 * @param options - Options for the interaction.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Link-Link.html | Link}
 * @category Interaction
 */
export const useLinkInteraction = (
  options?: LinkInteractionOptions,
  observable?: LinkInteractionEvents<Link>,
  active = true,
) => {
  const interaction = useMemo(() => new Link(options), [options]);

  useInteraction(interaction, observable, active);

  return interaction;
};
