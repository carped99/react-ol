import { PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';
import { OverlayOptions, useOverlay } from '../../overlay';
import { OverlayEvents } from '../../overlay/events';
import { splitEvents } from '../../events/splitEvents';

export const Overlay = ({ children, ...props }: PropsWithChildren<OverlayOptions & OverlayEvents>) => {
  const container = useRef<HTMLDivElement | null>(null);

  if (!container.current) {
    container.current = document.createElement('div');
  }

  const { options, events } = splitEvents(props);

  useOverlay(
    {
      ...options,
      element: container.current,
    },
    events,
  );

  return createPortal(children, container.current);
};
