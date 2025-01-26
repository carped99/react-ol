import { useOverlayInstance } from '@carped99/ol-react';
import Popup, { Options } from 'ol-ext/overlay/Popup.js';
import { useMemo } from 'react';

/**
 * Options for the overlay.
 *
 * @category Overlay Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopupOverlayOptions extends Options {}

/**
 * 지도에 `Popup`을 추가하는 훅
 * @param options - Options for the overlay.
 *
 * @category Overlay
 */
export const usePopupOverlay = (options: PopupOverlayOptions) => {
  const popup = useMemo(() => {
    return new Popup(options);
  }, [options]);

  useOverlayInstance(popup);

  return popup;
};
