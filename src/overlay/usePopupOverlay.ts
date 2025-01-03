import Popup, { Options } from 'ol-ext/overlay/Popup';
import { useEffect, useMemo } from 'react';
import { useMapContext } from '../context';

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
  const map = useMapContext().getMap();

  const popup = useMemo(() => {
    return new Popup(options);
  }, [options]);

  useEffect(() => {
    if (!map) return;

    map.addOverlay(popup);

    return () => {
      map.removeOverlay(popup);
    };
  }, [map, popup]);

  return popup;
};
