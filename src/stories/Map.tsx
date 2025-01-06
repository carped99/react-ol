import './map.css';
import { MapView, MapViewProps } from '../components/map/MapView';

export const Map = (props: MapViewProps) => {
  return (
    <>
      <MapView {...props} />
    </>
  );
};
