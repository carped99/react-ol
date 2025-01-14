import { DragRotateAndZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DragRotateAndZoom';
import { useInteraction } from './useInteraction';
import { DragRotateAndZoomInteractionEvents } from './event';
import { createInstanceProviderByKey, useInstance } from '../base';

/**
 * Options for the - {@link useDragRotateAndZoomInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DragRotateAndZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom and rotate the map by clicking and dragging on the map.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DragRotateAndZoom-DragRotateAndZoom.html | DragRotateAndZoom}
 * @category Interaction
 */
export const useDragRotateAndZoomInteraction = (
  options: DragRotateAndZoomInteractionOptions = {},
  events?: DragRotateAndZoomInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new DragRotateAndZoom(options);

const instanceProperties = [
  { name: 'condition', settable: false },
  { name: 'duration', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
