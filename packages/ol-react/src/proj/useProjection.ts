import { Projection } from 'ol/proj';
import { Options } from 'ol/proj/Projection';
import { useInstance } from '../hooks/useInstance';
import { createInstanceProviderByKey } from '../hooks/InstanceProviderByProperties';

export const useProjection = (options: Options) => {
  return useInstance(provider, options);
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

const provider = createInstanceProviderByKey(createInstance, instanceProperties);
