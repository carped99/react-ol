import { Interaction } from 'ol/interaction';
import { useEffect } from 'react';
import { useOlMapContext } from '@src/context';
import { OlObservableOptions } from '@src/observable/OlObservableOptions';
import { useOlObservable } from '@src/observable/useOlObservable';

/**
 * 지도에 `Interaction`을 추가하거나 제거하는 훅
 *
 * @param interaction - {@link Interaction}.
 * @param observable - Observable for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @category Interaction
 */
export const useOlInteraction = <T extends Interaction>(
  interaction: T,
  observable?: Readonly<OlObservableOptions<T>>,
  active: boolean = true,
) => {
  const { map } = useOlMapContext();

  useOlObservable(interaction, observable);

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
