import { useMemo } from 'react';
import Transform, { Options as TransformOptions } from 'ol-ext/interaction/Transform';
import { useInteraction } from './useInteraction';

export const useTransformInteraction = ({
  active = true,
  options,
}: {
  active?: boolean;
  options?: TransformOptions;
}) => {
  const transform = useMemo(() => new Transform(options), [options]);

  useInteraction(transform, active);

  return transform;
};
