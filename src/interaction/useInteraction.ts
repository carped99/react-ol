import { Interaction } from 'ol/interaction';
import { useEffect } from 'react';
import { ObservableEvents } from '../events/ObservableEvents';
import { useEvents } from '../events';
import { useMapContext } from '../context';

/**
 * 지도에 `Interaction`을 추가하거나 제거하는 훅
 *
 * @param interaction - {@link Interaction}.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @category Interaction
 */
export const useInteraction = <T extends Interaction>(
  interaction: T,
  events?: Readonly<ObservableEvents<T>>,
  active: boolean = true,
) => {
  const { map } = useMapContext();

  useEvents(interaction, events);

  useEffect(() => {
    if (!map || !interaction) return;

    map.addInteraction(interaction);

    return () => {
      map.removeInteraction(interaction);
    };
  }, [map, interaction]);

  useEffect(() => {
    interaction?.setActive(active);
  }, [interaction, active]);
};
