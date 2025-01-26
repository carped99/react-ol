import { PropsWithChildren } from 'react';
import { splitEvents } from '../../events/splitEvents';
import { useVectorLayer, VectorLayerOptions } from '../../layer';
import { VectorLayerEvents } from '../../layer/events';

export const VectorLayer = ({ children, ...props }: PropsWithChildren<VectorLayerOptions & VectorLayerEvents>) => {
  const { events, options } = splitEvents(props);
  useVectorLayer(options, events);
  return children;
};
