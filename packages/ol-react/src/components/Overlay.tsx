import { Options } from 'ol/Overlay';
import { PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOverlay } from '../overlay';

export const Overlay = ({ children, ...options }: PropsWithChildren<Options>) => {
  const container = useRef<HTMLDivElement | null>(null);

  if (!container.current) {
    container.current = document.createElement('div');
  }

  useOverlay({
    ...options,
    element: container.current,
  });

  return createPortal(children, container.current);
};
