import { Map, View } from 'ol';
import { MapEvents } from '@src/hooks/event/MapEvents';
import { ViewEvents } from '@src/hooks/event/ViewEvents';
import TileLayer from 'ol/layer/Tile';
import { VectorTileLayerEvents } from '@src/hooks/layer/event/VectorTileLayerEvents';
import TileSource from 'ol/source/Tile';
import Observable from 'ol/Observable';

export type ObservableProps<T extends Observable> = T extends Map
  ? MapEvents
  : T extends View
    ? ViewEvents
    : T extends TileLayer<infer S extends TileSource>
      ? VectorTileLayerEvents<TileLayer<S>>
      : unknown;
