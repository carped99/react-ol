import { DblClickDragZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DblClickDragZoom';
import { useInteraction } from './useInteraction';
import { DblClickDragZoomInteractionEvents } from './event';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { useInstance } from '../hooks/useInstance';

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
  events?: DblClickDragZoomInteractionEvents<DblClickDragZoom>,
  active = true,
) => {
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: Options) => new DblClickDragZoom(options);

const provider = createBaseObjectProvider(create, [], []);
