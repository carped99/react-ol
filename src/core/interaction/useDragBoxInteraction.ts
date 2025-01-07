import { DragBox } from 'ol/interaction';
import { Options } from 'ol/interaction/DragBox';
import { useInteraction } from './useInteraction';
import { DragBoxInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/BaseObjectProvider';

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
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new DragBox(options);

const instanceProperties = [
  { name: 'className', settable: false },
  { name: 'condition', settable: false },
  { name: 'minArea', settable: false },
  { name: 'boxEndCondition', settable: false },
  // { name: 'onBoxEnd', settable: true },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
