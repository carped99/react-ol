import './map.css';
import { createZustandMapStore, MapProvider } from '../context';
import { MapView, MapViewProps } from '../components/map/MapView';

const store = createZustandMapStore();

export const Map = (props: MapViewProps) => {
  // const store = useReactMapStore();

  return (
    <MapProvider store={store}>
      <MapView {...props} />
      <div className="map">
        <div id="map" className="map__target" />
      </div>
    </MapProvider>
  );
};
