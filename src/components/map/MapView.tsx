import { HTMLAttributes, PropsWithChildren } from 'react';
import { useMapView } from '../../map/useMapView';
import { useOSMLayer } from '../../layer';
import { MapViewOptions } from '../../map/options';

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
