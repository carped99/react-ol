import { useCallback, useRef } from 'react';
import RenderEvent from 'ol/render/Event';
import { Fill, Stroke, Style, Text } from 'ol/style';
import { getVectorContext } from 'ol/render';
import { unByKey } from 'ol/Observable';
import { EventsKey } from 'ol/events';
import { FeatureLike } from 'ol/Feature';
import { useOlMapContext } from '@src/context';
import { useOlVectorLayer } from '@src/layer/useOlVectorLayer';

export const useOlShowText = () => {
  const { map } = useOlMapContext();

  const eventKey = useRef<EventsKey | undefined>(undefined);

  const layer = useOlVectorLayer({});

  const cleanup = useCallback(() => {
    if (eventKey.current) {
      unByKey(eventKey.current);
      eventKey.current = undefined;
    }
  }, []);

  return useCallback(
    (feature: FeatureLike, text: string) => {
      cleanup();

      const start = new Date().getTime();
      const duration = 1500; // 1.5초

      const flashGeom = feature.getGeometry()!.clone();
      eventKey.current = layer.on('postrender', animate);

      function animate(event: RenderEvent) {
        const vectorContext = getVectorContext(event);
        const frameState = event.frameState!;
        const elapsed = frameState.time - start;

        let opacity = 1;
        if (elapsed > 1000) {
          const remainingTime = duration - elapsed;
          opacity = Math.max(remainingTime / (duration - 1000), 0);
        }

        if (elapsed > duration) {
          cleanup();
          return;
        }

        const style = creatTextStyle(text, opacity);
        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);

        requestAnimationFrame(() => map?.render());
      }

      map?.render();
    },
    [map, cleanup, layer],
  );
};

const creatTextStyle = (text: string, opacity: number) => {
  return new Style({
    text: new Text({
      text: text,
      font: 'bold 14px sans-serif',
      fill: new Fill({
        color: 'rgba(255, 255, 255, ' + opacity + ')', // 텍스트 색상 (흰색)
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, ' + opacity + ')', // 외곽선 색상 (검은색)
        width: 3, // 외곽선 두께
      }),
      padding: [5, 5, 5, 5], // 텍스트 주변 여백
      // backgroundFill: new Fill({
      //   color: 'rgba(0, 0, 0, 0.6)', // 반투명 검정 배경
      // }),
      offsetX: 0, // 텍스트 X 축 위치 조정
      offsetY: 0, // 텍스트 Y 축 위치 조정
      textAlign: 'center', // 텍스트 정렬
    }),
  });
};
