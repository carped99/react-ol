import DrawHole, { Options } from 'ol-ext/interaction/DrawHole';
import { useEffect, useMemo } from 'react';
import { useInteraction } from './useInteraction';

/**
 * Draw holes in a polygon.
 * @param active Whether the interaction should be active.
 * @param options {@link Options}.
 * @return {@link DrawHole}
 */
export const useDrawHoleInteraction = (options: Options, active: boolean = true): DrawHole => {
  const interaction = useMemo(() => new DrawHole(options), [options]);

  useInteraction(interaction, active);

  useEffect(() => {
    if (options.trace) {
      interaction.setTrace(options.trace);
    }
  }, [interaction, options.trace]);

  return interaction;
};
