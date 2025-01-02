import Popup, { Options } from 'ol-ext/overlay/Popup';
import { useEffect, useMemo } from 'react';
import { useOlMapContext } from '@src/context';

/**
 * Options for the overlay.
 *
 * @category Overlay Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlPopupOverlayOptions extends Options {}

/**
 * 지도에 `Popup`을 추가하는 훅
 * @param options - Options for the overlay.
 *
 * @category Overlay
 */
export const useOlPopupOverlay = (options: OlPopupOverlayOptions) => {
  const map = useOlMapContext().getMap();

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
