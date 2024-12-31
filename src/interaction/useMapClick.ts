import { useEffect } from 'react';
import { unByKey } from 'ol/Observable';
import { MapBrowserEvent } from 'ol';
import { useMapContext } from '@src/context/MapContext';

export const useMapClick = (handler: (event: MapBrowserEvent<PointerEvent>) => void) => {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map) return;

    const eventKey = map.on('click', handler);

    return () => {
      unByKey(eventKey);
    };
  }, [map, handler]);
};
