import { Interaction } from 'ol/interaction';
import { useEffect } from 'react';
import { EventOptions } from '../events/EventOptions';
import { useEvents } from '../events';
import { useMapContext } from '../context';

/**
 * 지도에 `Interaction`을 추가하거나 제거하는 훅
 *
 * @param interaction - {@link Interaction}.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @category Interaction
 */
export const useInteraction = <T extends Interaction>(
  interaction: T,
  observable?: Readonly<EventOptions<T>>,
  active: boolean = true,
) => {
  const map = useMapContext().getMap();

  useEvents(interaction, observable);

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
