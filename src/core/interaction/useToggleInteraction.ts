import { useEffect } from 'react';
import { Interaction } from 'ol/interaction';
import { Class } from 'type-fest';
import { useMapContext } from '../context';
import { findInteraction } from '../utils/common';

/**
 * {@link Interaction}을 활성화/비활성화 하는 훅
 * @param clazz - {@link Interaction} 클래스
 * @param active - 활성화 여부
 *
 * @category Interaction
 */
export const useToggleInteraction = (clazz: Class<Interaction>, active: boolean) => {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map) return;

    const interaction = findInteraction(map, clazz);
    interaction?.setActive(active);

    return () => {
      interaction?.setActive(!active);
    };
  }, [map, active, clazz]);
};
