import View, { ViewOptions } from 'ol/View';
import { useEffect, useRef } from 'react';
import { equals } from 'ol/coordinate';

export const useView = (options?: ViewOptions) => {
  const viewRef = useRef<View>(undefined);
  const prevOptions = useRef(options);

  // View 생성
  if (!viewRef.current) {
    viewRef.current = new View(options);
  }

  useEffect(() => {
    const view = viewRef.current!;

    if (prevOptions.current !== options) {
      updateView(view, prevOptions.current, options);
      prevOptions.current = options;
    }
  }, [options]);

  return viewRef.current;
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
