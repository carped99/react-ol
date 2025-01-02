import Tooltip, { Options } from 'ol-ext/overlay/Tooltip';
import { useEffect, useMemo } from 'react';
import { useOlMapContext } from '@src/context';

/**
 * Options for the overlay.
 *
 * @category Overlay Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlTooltipOverlayOptions extends Options {}

/**
 * 지도에 `Tooltip`을 추가하는 훅
 * @param options - Options for the overlay.
 *
 * @category Overlay
 */
export const useOlTooltipOverlay = (options?: OlTooltipOverlayOptions) => {
  const map = useOlMapContext().getMap();

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
