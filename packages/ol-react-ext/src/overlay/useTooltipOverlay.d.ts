import Tooltip, { Options } from 'ol-ext/overlay/Tooltip';
/**
 * Options for the overlay.
 *
 * @category Overlay Option
 */
export interface TooltipOverlayOptions extends Options {
}
/**
 * 지도에 `Tooltip`을 추가하는 훅
 * @param options - Options for the overlay.
 *
 * @category Overlay
 */
export declare const useTooltipOverlay: (options?: TooltipOverlayOptions) => Tooltip;
