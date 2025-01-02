import { useMemo } from 'react';
import { Link } from 'ol/interaction';
import { Options } from 'ol/interaction/Link';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlLinkInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlLinkInteractionOptions extends Options {}

/**
 * An interaction that synchronizes the map state with the URL.
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Link-Link.html | Link}
 * @category Interaction
 */
export const useOlLinkInteraction = (options: OlLinkInteractionOptions = {}, active = true) => {
  const interaction = useMemo(() => new Link(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
