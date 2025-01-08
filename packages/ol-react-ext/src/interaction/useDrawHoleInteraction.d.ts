import DrawHole, { Options } from 'ol-ext/interaction/DrawHole';
/**
 * Options for the - {@link useDrawHoleInteraction} hook.
 *
 * @category Interaction/Option
 */
export interface DrawHoleInteractionOptions extends Options {
}
/**
 * Draw holes in a polygon.
 *
 * @param options - Options for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://viglino.github.io/ol-ext/doc/doc-pages/interaction/DrawHole.html | DrawHole}
 * @category Interaction
 */
export declare const useDrawHoleInteraction: (options: DrawHoleInteractionOptions, active?: boolean) => DrawHole;
