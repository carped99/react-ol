import { PropsWithChildren } from 'react';
import { useVectorLayer, VectorLayerOptions } from '../../layer';
import { VectorLayerEvents } from '../../layer/events';
import { splitEvents } from '../../events/splitEvents';

export const VectorLayer = ({ children, ...props }: PropsWithChildren<VectorLayerOptions & VectorLayerEvents>) => {
  const { events, options } = splitEvents(props);
  useVectorLayer(options, events);
  return children;
};
