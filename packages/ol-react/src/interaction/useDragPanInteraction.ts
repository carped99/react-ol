import DragPan, { Options } from 'ol/interaction/DragPan.js';
import { createInstanceProviderByKey, useInstance } from '../base';
import { DragPanInteractionEvents } from './event';
import { useInteraction } from './useInteraction';

/**
 * Options for {@link useDragPanInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragPanInteractionOptions extends Options {}

/**
 * Allows the user to pan the map by dragging the map.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragPan-DragPan.html | DragPan}
 * @category Interaction
 */
export const useDragPanInteraction = (
  options: DragPanInteractionOptions = {},
  events?: DragPanInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new DragPan(options);

const instanceProperties = [
  { name: 'condition', settable: false },
  { name: 'onFocusOnly', settable: false },
  { name: 'kinetic', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
