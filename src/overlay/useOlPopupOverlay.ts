import Popup, { Options as PopupOptions } from 'ol-ext/overlay/Popup';
import { useEffect, useMemo } from 'react';
import { useOlMapContext } from '@src/context';

export const useOlPopupOverlay = ({ popupOptions }: { popupOptions?: PopupOptions }) => {
  const { map } = useOlMapContext();

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
