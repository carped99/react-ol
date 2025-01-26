import { useInteraction } from '@carped99/ol-react';
import Transform, { Options } from 'ol-ext/interaction/Transform.js';
import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TransformInteractionOptions extends Options {}

export const useTransformInteraction = (options: TransformInteractionOptions = {}, active = true) => {
  const transform = useMemo(() => new Transform(options), [options]);

  useInteraction(transform, undefined, active);

  return transform;
};
