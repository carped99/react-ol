import './map.css';
import { MapView, MapViewProps } from '../core/components/map/MapView';

export const Map = (props: MapViewProps) => {
  return (
    <>
      <MapView {...props} />
    </>
  );
};
