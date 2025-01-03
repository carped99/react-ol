import { HTMLAttributes, PropsWithChildren } from 'react';
import { MapViewOptions, useMapView } from '../../map/useMapView';
import { useOSMLayer } from '../../layer';

export interface MapViewProps extends MapViewOptions {
  container: HTMLAttributes<HTMLDivElement>;
}

export const MapView = ({ children, container, ...props }: PropsWithChildren<MapViewProps>) => {
  const [ref] = useMapView(props);
  useOSMLayer();
  return (
    <div ref={ref} {...container}>
      {children}
    </div>
  );
};
