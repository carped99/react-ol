import { useMemo } from 'react';
import { Link } from 'ol/interaction';
import { Options } from 'ol/interaction/Link';
import { useInteraction } from './useInteraction';

/**
 * An interaction that synchronizes the map state with the URL.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @returns {@link Link}
 */
export const useLinkInteraction = ({
  active = true,
  ...options
}: {
  active?: boolean;
} & Options): Link => {
  const interaction = useMemo(() => new Link(options), [options]);

  useInteraction(interaction, active);

  return interaction;
};
