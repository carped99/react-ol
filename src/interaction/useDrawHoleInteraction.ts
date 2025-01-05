import DrawHole, { Options } from 'ol-ext/interaction/DrawHole';
import { useEffect, useMemo } from 'react';
import { useInteraction } from './useInteraction';

/**
 * Options for the - {@link useDrawHoleInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawHoleInteractionOptions extends Options {}

/**
 * Draw holes in a polygon.
 *
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://viglino.github.io/ol-ext/doc/doc-pages/interaction/DrawHole.html | DrawHole}
 * @category Interaction
 */
export const useDrawHoleInteraction = (options: DrawHoleInteractionOptions, active = true) => {
  const interaction = useMemo(() => new DrawHole(options), [options]);

  useInteraction(interaction, undefined, active);

  useEffect(() => {
    if (options.trace) {
      interaction.setTrace(options.trace);
    }
  }, [interaction, options.trace]);

  return interaction;
};
