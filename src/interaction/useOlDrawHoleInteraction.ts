import DrawHole, { Options } from 'ol-ext/interaction/DrawHole';
import { useEffect, useMemo } from 'react';
import { useOlInteraction } from './useOlInteraction';

/**
 * Draw holes in a polygon.
 * @param active - Whether the interaction should be active.
 * @param options - {@link Options}.
 *
 * @category Interaction
 */
export const useOlDrawHoleInteraction = (options: Options, active: boolean = true): DrawHole => {
  const interaction = useMemo(() => new DrawHole(options), [options]);

  useOlInteraction(interaction, active);

  useEffect(() => {
    if (options.trace) {
      interaction.setTrace(options.trace);
    }
  }, [interaction, options.trace]);

  return interaction;
};
