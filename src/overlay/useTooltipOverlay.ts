import Tooltip, { Options } from 'ol-ext/overlay/Tooltip';
import { useEffect, useMemo } from 'react';
import { useMapContext } from '../context';

/**
 * Options for the overlay.
 *
 * @category Overlay Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TooltipOverlayOptions extends Options {}

/**
 * 지도에 `Tooltip`을 추가하는 훅
 * @param options - Options for the overlay.
 *
 * @category Overlay
 */
export const useTooltipOverlay = (options?: TooltipOverlayOptions) => {
  const { map } = useMapContext();

  const tooltip = useMemo(() => {
    return new Tooltip(options);
  }, [options]);

  useEffect(() => {
    if (!map) return;

    map.addOverlay(tooltip);

    return () => {
      map.removeOverlay(tooltip);
    };
  }, [map, tooltip]);

  return tooltip;
};
