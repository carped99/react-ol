import BaseImage, { Options } from 'ol/layer/BaseImage';
import { useLayer } from './useLayer';

type Inferred<T extends BaseImage<any, any>> =
  T extends BaseImage<infer SourceType, infer RendererType>
    ? { SourceType: SourceType; RendererType: RendererType }
    : never;

export const useBaseImageLayer = <T extends BaseImage<any, any>>(
  layer: T,
  options: Options<Inferred<T>['SourceType']>,
) => {
  useLayer(layer, options);
};
