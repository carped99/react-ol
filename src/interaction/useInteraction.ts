import { Interaction } from 'ol/interaction';
import { useEffect } from 'react';
import { useMapContext } from '@src/context/MapContext';

export const useInteraction = (interaction: Interaction, active: boolean = true) => {
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
