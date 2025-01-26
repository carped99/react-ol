import { Options } from 'ol/proj/Projection.js';
import { Projection } from 'ol/proj.js';
import { createInstanceProviderByKey, useInstance } from '../base';

export const useProjection = (options: Options) => {
  return useInstance(instanceProvider, options);
};

const createInstance = (options: Options) => new Projection(options);

const instanceProperties = [
  { name: 'code', settable: false },
  { name: 'units', settable: false },
  { name: 'axisOrientation', settable: false },
  { name: 'metersPerUnit', settable: false },
  { name: 'extent', settable: true },
  { name: 'worldExtent', settable: true },
  { name: 'global', settable: true },
  { name: 'getPointResolution', settable: true },
] as const;

const instanceProvider = createInstanceProviderByKey(createInstance, instanceProperties);
