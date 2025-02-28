import { useOverlayInstance } from '@carped99/ol-react';
import Tooltip, { Options } from 'ol-ext/overlay/Tooltip.js';
import { useMemo } from 'react';

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
  const tooltip = useMemo(() => {
    return new Tooltip(options);
  }, [options]);

  useOverlayInstance(tooltip);

  return tooltip;
};
