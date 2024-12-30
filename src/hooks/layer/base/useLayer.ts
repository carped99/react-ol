import { useEffect, useRef } from 'react';
import Layer, { Options as LayerOptions } from 'ol/layer/Layer';
import { Source } from 'ol/source';
import { useBaseLayer } from '@src/hooks/layer/base/useBaseLayer';
import { useMapContext } from '@src/context/MapContext';

export const useLayer = <T extends Layer<S, any>, S extends Source = Source>(
  layer: T,
  options: Readonly<LayerOptions<S>>,
) => {
  const { map } = useMapContext();

  useBaseLayer(layer, options);

  // 레이어의 위치를 유지하기 위해 레이어 인덱스를 저장
  const prevIndexRef = useRef(-1);

  // 레이어가 변경되면 이전 레이어를 제거하고 새로운 레이어를 추가한다.
  useEffect(() => {
    if (!map || !layer) return;

    // map 옵션이 있으면 레이어 목록에서 관리 안함
    if (options.map != null) {
      return () => {
        layer.setMap(null);
      };
    }

    const layers = map.getLayers();

    layers.push(layer);

    // 이전 레이어 인덱스가 없으면 레이어를 추가한다.
    // if (prevIndexRef.current < 0) {
    //   layers.push(layer);
    // } else {
    //   layers.insertAt(prevIndexRef.current, layer);
    // }

    return () => {
      const layers = map.getLayers();
      prevIndexRef.current = layers.getArray().indexOf(layer);
      layers.removeAt(prevIndexRef.current);
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
