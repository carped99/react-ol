import Overlay from 'ol/Overlay.js';
import { useEffect } from 'react';
import { useMapContext } from '../context';
import { useEvents } from '../events';
import { OverlayEvents } from './events';

export const useOverlayInstance = <E extends OverlayEvents>(overlay: Overlay, events?: E) => {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map || !overlay) return;

    map.addOverlay(overlay);

    return () => {
      map.removeOverlay(overlay);
    };
  }, [map, overlay]);

  useEvents(overlay, events);
};
