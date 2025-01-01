import { useMemo } from 'react';
import { Link } from 'ol/interaction';
import { Options } from 'ol/interaction/Link';
import { useOlInteraction } from './useOlInteraction';

/**
 * An interaction that synchronizes the map state with the URL.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlLinkInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Link => {
  const interaction = useMemo(() => new Link(options), [options]);

  useOlInteraction(interaction, active);

  return interaction;
};
