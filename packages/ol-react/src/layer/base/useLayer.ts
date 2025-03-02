import Layer, { Options as LayerOptions } from 'ol/layer/Layer.js';
import { Source } from 'ol/source.js';
import { useEffect } from 'react';
import { useMapContext } from '../../context';

export const useLayer = <S extends Source = Source>(layer: Layer<S, any>, options: Readonly<LayerOptions<S>>) => {
  const { map } = useMapContext();

  // useBaseLayer(layer, options);

  // 레이어가 변경되면 이전 레이어를 제거하고 새로운 레이어를 추가한다.
  useEffect(() => {
    if (!map || !layer) return;

    // map 옵션이 있으면 레이어 목록에서 관리 안함
    if (options.map != null) {
      // 여기서 해야하나?
      layer.setMap(options.map);
      return () => {
        layer.setMap(null);
      };
    }

    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, layer, options.map]);

  return layer;
};
