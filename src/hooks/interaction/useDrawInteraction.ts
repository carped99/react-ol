import { useEffect, useMemo } from 'react';
import { Draw } from 'ol/interaction';
import { DrawEvent, Options as DrawOptions } from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable';
import { useInteraction } from '@src/hooks/interaction/useInteraction';

type useDrawInteractionProps = {
  active?: boolean;
  onDrawStart?: (event: DrawEvent) => void;
  onDrawEnd?: (event: DrawEvent) => void;
  onDrawAbort?: (event: DrawEvent) => void;
  drawOptions: DrawOptions;
};

export const useDrawInteraction = ({
  active = true,
  onDrawStart,
  onDrawEnd,
  onDrawAbort,
  drawOptions,
}: useDrawInteractionProps) => {
  const draw = useMemo(() => new Draw(drawOptions), [drawOptions]);

  useInteraction(draw, active);

  useEffect(() => {
    if (!onDrawStart) return;
    const eventKey = draw.on('drawstart', onDrawStart);
    return () => unByKey(eventKey);
  }, [draw, onDrawStart]);

  useEffect(() => {
    if (!onDrawEnd) return;
    const eventKey = draw.on('drawend', onDrawEnd);
    return () => unByKey(eventKey);
  }, [draw, onDrawEnd]);

  useEffect(() => {
    if (!onDrawAbort) return;
    const eventKey = draw.on('drawabort', onDrawAbort);
    return () => unByKey(eventKey);
  }, [draw, onDrawAbort]);

  return draw;
};
