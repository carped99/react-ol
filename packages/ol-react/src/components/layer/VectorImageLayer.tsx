import { PropsWithChildren } from 'react';
import { useVectorImageLayer, VectorImageLayerOptions } from '../../layer';
import { VectorImageLayerEvents } from '../../layer/events';
import { splitEvents } from '../../events/splitEvents';

export const VectorImageLayer = ({
  children,
  ...props
}: PropsWithChildren<VectorImageLayerOptions & VectorImageLayerEvents>) => {
  const { events, options } = splitEvents(props);
  useVectorImageLayer(options, events);
  return children;
};
