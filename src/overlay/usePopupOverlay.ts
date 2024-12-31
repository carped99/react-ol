import Popup, { Options as PopupOptions } from 'ol-ext/overlay/Popup';
import { useEffect, useMemo } from 'react';
import { useMapContext } from '@src/context/MapContext';

export const usePopupOverlay = ({ popupOptions }: { popupOptions?: PopupOptions }) => {
  const { map } = useMapContext();

  const popup = useMemo(() => {
    return new Popup(popupOptions);
  }, [popupOptions]);

  useEffect(() => {
    if (!map) return;

    map.addOverlay(popup);

    return () => {
      map.removeOverlay(popup);
    };
  }, [map, popup]);

  return popup;
};
