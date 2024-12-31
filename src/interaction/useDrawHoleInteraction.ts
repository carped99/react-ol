import DrawHole, { Options as DrawHoleOptions } from 'ol-ext/interaction/DrawHole';
import { useEffect, useMemo } from 'react';
import { useInteraction } from './useInteraction';

export const useDrawHoleInteraction = ({
  active = true,
  trace,
  drawHoleOptions,
}: {
  active?: boolean;
  trace?: DrawHoleOptions['trace'];
  drawHoleOptions: Omit<DrawHoleOptions, 'trace'>;
}) => {
  const drawHole = useMemo(() => new DrawHole(drawHoleOptions), [drawHoleOptions]);

  useInteraction(drawHole, active);

  useEffect(() => {
    if (trace) {
      drawHole.setTrace(trace);
    }
  }, [drawHole, trace]);

  return drawHole;
};
