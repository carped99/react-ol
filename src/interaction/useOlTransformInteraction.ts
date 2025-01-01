import { useMemo } from 'react';
import Transform, { Options as TransformOptions } from 'ol-ext/interaction/Transform';
import { useOlInteraction } from './useOlInteraction';

export const useOlTransformInteraction = ({
  active = true,
  options,
}: {
  active?: boolean;
  options?: TransformOptions;
}) => {
  const transform = useMemo(() => new Transform(options), [options]);

  useOlInteraction(transform, active);

  return transform;
};
