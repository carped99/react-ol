import { Overlay } from 'ol';
import { useMapContext } from '../context';
import { useEvents } from '../events';
import { useEffect } from 'react';
import { OverlayEvents } from './events';

export const useOverlay = <T extends Overlay, E extends OverlayEvents<T>>(overlay: T, events?: E) => {
  const { map } = useMapContext();

  useEvents(overlay, events);

  useEffect(() => {
    if (!map || !overlay) return;

    map.addOverlay(overlay);

    return () => {
      map.removeOverlay(overlay);
    };
  }, [map, overlay]);
};
