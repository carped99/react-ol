import { DoubleClickZoom } from 'ol/interaction';
import { Options } from 'ol/interaction/DoubleClickZoom';
import { useInteraction } from './useInteraction';
import { DblClickZoomInteractionEvents } from './event';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';

/**
 * Options for the - {@link useDblClickZoomInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DblClickZoomInteractionOptions extends Options {}

/**
 * Allows the user to zoom by double-clicking on the map.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_DoubleClickZoom-DoubleClickZoom.html | DoubleClickZoom}.
 * @category Interaction
 */
export const useDblClickZoomInteraction = (
  options: DblClickZoomInteractionOptions = {},
  events?: DblClickZoomInteractionEvents<DoubleClickZoom>,
  active = true,
) => {
  const instance = useInstance(provider, options);

  useInteraction(instance, events, active);

  return instance;
};

const create = (options: Options) => new DoubleClickZoom(options);

const provider = createBaseObjectProvider(create, [], []);
