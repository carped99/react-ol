import View, { ViewOptions as OLViewOptions } from 'ol/View';
import { useEffect, useRef } from 'react';
import { equals } from 'ol/coordinate';
import { BaseObjectOptions, useBaseObject } from '../hooks/useBaseObject';
import { usePrevious } from '../hooks/usePrevious';
import { useEvents } from '../events';
import { compareOptIn } from '../utils/common';
import { ViewEvents } from '.';

export interface ViewOptions extends OLViewOptions {
  properties?: BaseObjectOptions['properties'];
}

/**
 * Hook for creating an OpenLayers view.
 * @param options - Options for the view.
 * @param observable - Observable for the interaction.
 *
 * @category Base
 */
export const useView = (options: Readonly<ViewOptions>, observable?: ViewEvents<View>) => {
  const viewRef = useRef<View>(undefined);
  if (!viewRef.current) {
    viewRef.current = new View(options);
  }

  const prevOpts = usePrevious(options);

  useEffect(() => {
    console.log('useView useEffect', prevOpts, options);
    if (!viewRef.current) return;

    if (compareOptIn(prevOpts, options, mutationKeys)) {
      updateView(viewRef.current, prevOpts, options);
    } else {
      viewRef.current = new View(options);
    }
  }, [prevOpts, options]);

  useBaseObject(viewRef.current, options);
  useEvents(viewRef.current, observable);

  return viewRef.current;
};

const mutationKeys: readonly (keyof ViewOptions)[] = [
  'enableRotation',
  'extent',
  'maxResolution',
  'minResolution',
  'projection',
  'resolutions',
  'zoomFactor',
];

const updateView = (view: View, prev?: ViewOptions, curr?: ViewOptions) => {
  console.log('updateView', prev, curr);
  if (prev?.zoom !== curr?.zoom && curr?.zoom != null) {
    view.setZoom(curr.zoom);
  }

  if (prev?.minZoom !== curr?.minZoom && curr?.minZoom != null) {
    view.setMinZoom(curr.minZoom);
  }

  if (prev?.maxZoom !== curr?.maxZoom && curr?.maxZoom != null) {
    view.setMaxZoom(curr.maxZoom);
  }

  if (curr?.center != null && (!prev?.center || !equals(prev?.center, curr.center))) {
    view.setCenter(curr.center);
  }

  if (prev?.constrainResolution !== curr?.constrainResolution && curr?.constrainResolution != null) {
    view.setConstrainResolution(curr.constrainResolution);
  }

  if (prev?.rotation !== curr?.rotation && curr?.rotation != null) {
    view.setRotation(curr.rotation);
  }
};
