import { useEffect } from 'react';
import Layer, { Options as LayerOptions } from 'ol/layer/Layer';
import { Source } from 'ol/source';
import { useMapContext } from '@src/context/MapContext';
import { useOlBaseLayer } from './useOlBaseLayer';

export const useOlLayer = <T extends Layer<S, any>, S extends Source = Source>(
  layer: T,
  options: Readonly<LayerOptions<S>>,
) => {
  const { map } = useMapContext();

  useOlBaseLayer(layer, options);

  // 레이어가 변경되면 이전 레이어를 제거하고 새로운 레이어를 추가한다.
  useEffect(() => {
    if (!map || !layer) return;

    // map 옵션이 있으면 레이어 목록에서 관리 안함
    if (options.map != null) {
      return () => {
        layer.setMap(null);
      };
    }

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, layer, options.map]);

  useEffect(() => {
    if (layer.getSource() != options.source) {
      console.log('===> update source', layer, options.source);
      layer.setSource(options.source ?? null);
    }
  }, [layer, options.source]);

  return layer;
};
