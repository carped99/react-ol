import { Options as TransformOptions } from 'ol-ext/interaction/Transform';
import { useEffect, useMemo } from 'react';
import { unByKey } from 'ol/Observable';
import type { Layer } from 'ol/layer';
import { useTransformInteraction } from '@src/hooks/interaction/useTransformInteraction';

export const RotateAnglePropertyName = 'rotate:angle';

// 회전, 이동할 수 있도록 하는 인터렉션을 생성한다.
export const useTransformHandler = ({ active, layers }: { active: boolean; layers: Layer[] }) => {
  const options = useMemo<TransformOptions>(
    () => ({
      layers,
      translate: true,
      stretch: false,
      scale: false,
      rotate: true,
    }),
    [layers],
  );

  const transform = useTransformInteraction({
    active,
    options,
  });

  /**
   * 회전 중에 발생하는 이벤트를 처리한다.
   * 회전각도는 'rotate:angle' 속성에 저장한다.
   * 회전 중에는 '__rotating:angle__' 속성에 임시로 저장한다.
   */
  useEffect(() => {
    const tempPropertyName = '__rotating:angle__';

    const rotateStartKey = transform.on('rotatestart', (event) => {
      event.features.forEach((feature) => {
        // 현재 각도를 임시로 저장한다.
        const initial: number = feature.get(RotateAnglePropertyName) || 0;
        feature.set(tempPropertyName, initial, true);
      });
    });

    const rotateEndKey = transform.on('rotateend', (event) => {
      event.features.forEach((feature) => {
        // 임시로 저장한 각도를 삭제한다.
        feature.unset(tempPropertyName, true);
      });
    });

    const rotatingKey = transform.on('rotating', (event) => {
      event.features.forEach((feature) => {
        // 이벤트로부터 회전값을 가져와 현재 각도에서 빼서 회전값을 설정한다.
        const initial: number = feature.get(tempPropertyName);
        feature.set(RotateAnglePropertyName, initial - event.angle, true);
      });
    });

    return () => {
      unByKey(rotateStartKey);
      unByKey(rotateEndKey);
      unByKey(rotatingKey);
    };
  }, [transform]);
};
