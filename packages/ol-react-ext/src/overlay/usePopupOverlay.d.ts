import Popup, { Options } from 'ol-ext/overlay/Popup';
/**
 * Options for the overlay.
 *
 * @category Overlay Option
 */
export interface PopupOverlayOptions extends Options {
}
/**
 * 지도에 `Popup`을 추가하는 훅
 * @param options - Options for the overlay.
 *
 * @category Overlay
 */
export declare const usePopupOverlay: (options: PopupOverlayOptions) => Popup;
