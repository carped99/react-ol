import { useMemo } from 'react';
import Transform, { Options } from 'ol-ext/interaction/Transform';
import { useOlInteraction } from './useOlInteraction';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OlTransformInteractionOptions extends Options {}

export const useOlTransformInteraction = (options: OlTransformInteractionOptions = {}, active = true) => {
  const transform = useMemo(() => new Transform(options), [options]);

  useOlInteraction(transform, undefined, active);

  return transform;
};
