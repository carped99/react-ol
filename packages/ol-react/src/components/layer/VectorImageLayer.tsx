import { PropsWithChildren } from 'react';
import { splitEvents } from '../../events/splitEvents';
import { useVectorImageLayer, VectorImageLayerOptions } from '../../layer';
import { VectorImageLayerEvents } from '../../layer/events';

export const VectorImageLayer = ({
  children,
  ...props
}: PropsWithChildren<VectorImageLayerOptions & VectorImageLayerEvents>) => {
  const { events, options } = splitEvents(props);
  useVectorImageLayer(options, events);
  return children;
};
