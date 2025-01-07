import { Draw } from 'ol/interaction';
import { Options } from 'ol/interaction/Draw';
import { useInteraction } from './useInteraction';
import { DrawInteractionEvents } from './event';
import { createInstanceProviderByKey } from '../hooks/BaseObjectProvider';
import { useInstance } from '../hooks/useInstance';

/**
 * Options for the - {@link useDrawInteraction} hook.
 *
 * @category Interaction/Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawInteractionOptions extends Options {}

/**
 * Interaction for drawing feature geometries.
 * @param options - Options for the interaction.
 * @param events - Events for the interaction.
 * @param active - Whether the interaction should be active.
 *
 * @see - {@link https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html | Draw}
 * @category Interaction
 */
export const useDrawInteraction = (options: DrawInteractionOptions, events?: DrawInteractionEvents, active = true) => {
  const instance = useInstance(instanceProvider, options);

  useInteraction(instance, events, active);

  return instance;
};

const createInstance = (options: DrawInteractionOptions) => new Draw(options);

const instanceProperties = [
  { name: 'type', settable: false },
  { name: 'clickTolerance', settable: false },
  { name: 'features', settable: false },
  { name: 'source', settable: false },
  { name: 'dragVertexDelay', settable: false },
  { name: 'snapTolerance', settable: false },
  { name: 'stopClick', settable: false },
  { name: 'maxPoints', settable: false },
  { name: 'minPoints', settable: false },
  { name: 'finishCondition', settable: false },
  { name: 'style', settable: false },
  { name: 'geometryFunction', settable: false },
  { name: 'geometryName', settable: false },
  { name: 'geometryLayout', settable: false },
  { name: 'condition', settable: false },
  { name: 'freehand', settable: false },
  { name: 'freehandCondition', settable: false },
  { name: 'trace', settable: false },
  { name: 'traceSource', settable: false },
  { name: 'wrapX', settable: false },
];

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
