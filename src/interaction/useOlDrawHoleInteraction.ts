import DrawHole, { Options } from 'ol-ext/interaction/DrawHole';
import { useEffect, useMemo } from 'react';
import { useOlInteraction } from './useOlInteraction';

/**
 * Options for the {@link useOlDrawHoleInteraction} hook.
 *
 * @category Interaction Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlDrawHoleInteractionOptions extends Options {}

/**
 * Draw holes in a polygon.
 *
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see {@link https://viglino.github.io/ol-ext/doc/doc-pages/interaction/DrawHole.html | DrawHole}
 * @category Interaction
 */
export const useOlDrawHoleInteraction = (options: OlDrawHoleInteractionOptions, active = true) => {
  const interaction = useMemo(() => new DrawHole(options), [options]);

  useOlInteraction(interaction, active);

  useEffect(() => {
    if (options.trace) {
      interaction.setTrace(options.trace);
    }
  }, [interaction, options.trace]);

  return interaction;
};
