import View, { ViewOptions as OLViewOptions } from 'ol/View';
import { useEffect, useRef, useState } from 'react';
import { equals } from 'ol/coordinate';
import { getLogger } from '@src/utils/logger';

export interface ViewOptions extends OLViewOptions {}

export const useView = (options?: Readonly<ViewOptions>) => {
  getLogger('View').trace(() => 'useView', options);

  const [view] = useState<View>(() => new View(options));
  const prevOptions = useRef(options);

  useEffect(() => {
    if (prevOptions.current !== options) {
      updateView(view, prevOptions.current, options);
      prevOptions.current = options;
    }
  }, [view, options]);

  return view;
};

const updateView = (view: View, prev?: ViewOptions, curr?: ViewOptions) => {
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
