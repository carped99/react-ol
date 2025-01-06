import { useMemo } from 'react';
import { useInteraction } from '../../core';
import Transform, { Options } from 'ol-ext/interaction/Transform';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TransformInteractionOptions extends Options {}

export const useTransformInteraction = (options: TransformInteractionOptions = {}, active = true) => {
  const transform = useMemo(() => new Transform(options), [options]);

  useInteraction(transform, undefined, active);

  return transform;
};
