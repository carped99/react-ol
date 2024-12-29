import { useEffect, useMemo } from 'react';
import { Modify } from 'ol/interaction';
import { ModifyEvent, Options as ModifyOptions } from 'ol/interaction/Modify';
import { unByKey } from 'ol/Observable';
import { useInteraction } from '@src/hooks/interaction/useInteraction';

export const useModifyInteraction = ({
  active = true,
  onModifyStart,
  onModifyEnd,
  modifyOptions,
}: {
  active?: boolean;
  onModifyStart?: (event: ModifyEvent) => void;
  onModifyEnd?: (event: ModifyEvent) => void;
  modifyOptions: ModifyOptions;
}) => {
  const modify = useMemo(() => new Modify(modifyOptions), [modifyOptions]);

  useInteraction(modify, active);

  useEffect(() => {
    if (!onModifyStart) return;

    const eventKey = modify.on('modifystart', onModifyStart);

    return () => {
      unByKey(eventKey);
    };
  }, [modify, onModifyStart]);

  useEffect(() => {
    if (!onModifyEnd) return;

    const eventKey = modify.on('modifyend', onModifyEnd);

    return () => {
      unByKey(eventKey);
    };
  }, [modify, onModifyEnd]);

  return modify;
};
