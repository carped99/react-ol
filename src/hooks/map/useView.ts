import View, { ViewOptions as OLViewOptions } from 'ol/View';
import { useEffect, useRef, useState } from 'react';
import { equals } from 'ol/coordinate';
import { Map } from 'ol';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { useEventHandler } from '@src/hooks/map/useEventHandler';

interface ViewEvents {
  onError?: (this: Map, e: RenderEvent) => boolean | void;
  onPropertyChange?: (this: Map, e: ObjectEvent) => boolean | void;
  onChange?: (this: View, e: BaseEvent) => void;
  onChangeCenter?: (this: View, e: ObjectEvent) => void;
  onChangeResolution?: (this: View, e: ObjectEvent) => void;
  onChangeRotation?: (this: View, e: ObjectEvent) => void;
}

export interface ViewOptions extends OLViewOptions, ViewEvents {}

export const useView = (options?: ViewOptions) => {
  console.log('==================== useView =================', options);

  const [view] = useState<View>(() => new View(options));
  const prevOptions = useRef(options);

  useEventHandler(view, options);

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
