import View, { ViewOptions as OLViewOptions } from 'ol/View';
import { useEvents } from '../events';
import { ViewEvents } from './events';
import { createInstanceProviderByKey, useInstance } from '../base';
import { BaseObjectOptions } from '../base/useProperties';

export interface ViewOptions extends OLViewOptions, ViewEvents {
  properties?: BaseObjectOptions['properties'];
}

/**
 * Hook for creating an OpenLayers view.
 * @param options - Options for the view.
 *
 * @category Base
 */
export const useView = (options: Readonly<ViewOptions>) => {
  const view = useInstance(provider, options);

  useEvents(view, options);

  return view;
};

const create = (options: Readonly<ViewOptions>) => new View(options);

const instanceProperties = [
  { name: 'constrainRotation', settable: false },
  { name: 'enableRotation', settable: false },
  { name: 'constrainOnlyCenter', settable: false },
  { name: 'smoothExtentConstraint', settable: false },
  { name: 'smoothResolutionConstraint', settable: false },
  { name: 'minResolution', settable: false },
  { name: 'maxResolution', settable: false },
  { name: 'multiWorld', settable: false },
  { name: 'showFullExtent', settable: false },
  { name: 'projection', settable: false },
  { name: 'resolutions', settable: false },
  { name: 'zoomFactor', settable: false },
  { name: 'padding', settable: false },
  { name: 'extent', settable: false },

  { name: 'center', settable: true, nullable: true },
  { name: 'constrainResolution', settable: true },
  { name: 'maxZoom', settable: true },
  { name: 'minZoom', settable: true },
  { name: 'rotation', settable: true },
  { name: 'resolution', settable: true, nullable: true },
  { name: 'zoom', settable: true },
] as const;

const provider = createInstanceProviderByKey(create, instanceProperties);
