import { DragBox } from 'ol/interaction';
import { Options } from 'ol/interaction/DragBox';
import { useInteraction } from './useInteraction';
import { DragBoxInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

/**
 * Options for the - {@link DragBoxInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragBoxInteractionOptions extends Options {}

/**
 * Allows the user to draw a vector box by clicking and dragging on the map.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragBox-DragBox.html | DragBox}
 * @category Interaction
 */
export const useDragBoxInteraction = (
  options: DragBoxInteractionOptions = {},
  events?: DragBoxInteractionEvents,
  active = true,
) => {
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: Options) => new DragBox(options);

const provider = createBaseObjectProvider(create, [], []);
