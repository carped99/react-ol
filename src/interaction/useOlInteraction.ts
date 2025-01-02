import { Interaction } from 'ol/interaction';
import { useEffect } from 'react';
import { useMapContext } from '@src/context/MapContext';

/**
 * 지도에 `Interaction`을 추가하거나 제거하는 훅
 *
 * @param interaction - {@link Interaction}.
 * @param active - Whether the interaction should be active.
 *
 * @category Interaction
 */
export const useOlInteraction = (interaction: Interaction, active: boolean = true) => {
  const { map } = useMapContext();

  useEffect(() => {
    if (!map || !interaction) return;

    map.addInteraction(interaction);

    return () => {
      map.removeInteraction(interaction);
    };
  }, [map, interaction]);

  useEffect(() => {
    if (interaction) {
      interaction.setActive(active);
    }
  }, [interaction, active]);
};
