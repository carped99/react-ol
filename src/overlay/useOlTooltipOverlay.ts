import Tooltip, { Options as TooltipOptions } from 'ol-ext/overlay/Tooltip';
import { useEffect, useMemo } from 'react';
import { useMapContext } from '@src/context/MapContext';

export const useOlTooltipOverlay = ({ tooltipOptions }: { tooltipOptions?: TooltipOptions }) => {
  const { map } = useMapContext();

  const tooltip = useMemo(() => {
    return new Tooltip(tooltipOptions);
  }, [tooltipOptions]);

  useEffect(() => {
    if (!map) return;

    map.addOverlay(tooltip);

    return () => {
      map.removeOverlay(tooltip);
    };
  }, [map, tooltip]);

  return tooltip;
};
