import View from 'ol/View';
import { useProperties } from '../hooks/useProperties';
import { useEvents } from '../events';
import { ViewEvents } from './events';
import { ViewOptions } from './options';
import { useInstance } from '../hooks/useInstance';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { InstanceCreator } from '../hooks/InstanceProvider';

/**
 * Hook for creating an OpenLayers view.
 * @param options - Options for the view.
 * @param events - Events for the View.
 *
 * @category Base
 */
export const useView = (options: Readonly<ViewOptions>, events?: ViewEvents<View>) => {
  const view = useInstance(provider, options);

  useProperties(view, options);

  useEvents(view, events);

  return view;
};

const updateKeys = [
  'enableRotation',
  'extent',
  'maxResolution',
  'minResolution',
  'projection',
  'resolutions',
  'zoomFactor',
] as const;

const create: InstanceCreator<View, ViewOptions> = (options?: ViewOptions) => new View(options);

const provider = createBaseObjectProvider(create, [], updateKeys);

// const updateView = (view: View, curr?: ViewOptions, prev?: ViewOptions) => {
//   console.log('updateView', prev, curr);
//   if (prev?.zoom !== curr?.zoom && curr?.zoom != null) {
//     view.setZoom(curr.zoom);
//   }
//
//   if (prev?.minZoom !== curr?.minZoom && curr?.minZoom != null) {
//     view.setMinZoom(curr.minZoom);
//   }
//
//   if (prev?.maxZoom !== curr?.maxZoom && curr?.maxZoom != null) {
//     view.setMaxZoom(curr.maxZoom);
//   }
//
//   if (curr?.center != null && (!prev?.center || !equals(prev?.center, curr.center))) {
//     view.setCenter(curr.center);
//   }
//
//   if (prev?.constrainResolution !== curr?.constrainResolution && curr?.constrainResolution != null) {
//     view.setConstrainResolution(curr.constrainResolution);
//   }
//
//   if (prev?.rotation !== curr?.rotation && curr?.rotation != null) {
//     view.setRotation(curr.rotation);
//   }
// };
