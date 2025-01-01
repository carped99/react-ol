import BaseImage, { Options } from 'ol/layer/BaseImage';
import { useOlLayer } from './useOlLayer';

type Inferred<T extends BaseImage<any, any>> =
  T extends BaseImage<infer SourceType, infer RendererType>
    ? { SourceType: SourceType; RendererType: RendererType }
    : never;

export const useOlBaseImageLayer = <T extends BaseImage<any, any>>(
  layer: T,
  options: Options<Inferred<T>['SourceType']>,
) => {
  useOlLayer(layer, options);
};
