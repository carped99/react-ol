import DblClickDragZoom, { Options } from 'ol/interaction/DblClickDragZoom.js';
import { createInstanceProviderByKey, useInstance } from '../base';
import { DblClickDragZoomInteractionEvents } from './event';
import { useInteraction } from './useInteraction';

/**
 * Options for the - {@link useDblClickDragZoomInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DblClickDragZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom the map by double tap/click then drag up/down with one finger/left mouse.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DblClickDragZoom-DblClickDragZoom.html | DblClickDragZoom}.
 * @category Interaction
 */
export const useDblClickDragZoomInteraction = (
  options: DblClickDragZoomInteractionOptions = {},
  events?: DblClickDragZoomInteractionEvents,
  active = true,
) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: Options) => new DblClickDragZoom(options);

const instanceProperties = [
  { name: 'condition', settable: false },
  { name: 'duration', settable: false },
  { name: 'delta', settable: false },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
