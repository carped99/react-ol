import { useEffect, useMemo } from 'react';
import { Snap } from 'ol/interaction';
import { Options as SnapOptions } from 'ol/interaction/Snap';
import { SnapEvent } from 'ol/events/SnapEvent';
import { unByKey } from 'ol/Observable';
import { useInteraction } from './useInteraction';

export const useSnapInteraction = ({
  active = true,
  onSnap,
  snapOptions,
}: {
  active?: boolean;
  onSnap?: (event: SnapEvent) => void;
  snapOptions: SnapOptions;
}) => {
  if (!snapOptions.features && !snapOptions.source) {
    throw new Error('snapOptions should have features or source');
  }

  const snap = useMemo(() => new Snap(snapOptions), [snapOptions]);

  useInteraction(snap, active);

  useEffect(() => {
    if (!onSnap) return;

    const snapKey = snap.on('snap', onSnap);

    return () => {
      unByKey(snapKey);
    };
  }, [snap, onSnap]);

  return snap;
};
