import BaseVectorLayer, { Options } from 'ol/layer/BaseVector';
import { FeatureLike } from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorTile from 'ol/source/VectorTile';
import { useLayer } from './useLayer';

export const useBaseVectorLayer = <F extends FeatureLike, S extends VectorSource<F> | VectorTile<F>>(
  layer: BaseVectorLayer<F, S, any>,
  options: Readonly<Options<F, S>>,
) => {
  useLayer(layer, options);

  // useEffect(() => {
  //   if (options.declutter != null && layer.getDeclutter() !== options.declutter) {
  //     layer.setDeclutter(options.declutter);
  //   }
  // }, [layer, options.declutter]);
  //
  // useEffect(() => {
  //   if (layer.getRenderOrder() !== options.renderOrder) {
  //     layer.setRenderOrder(options.renderOrder);
  //   }
  // }, [layer, options.renderOrder]);
  //
  // useEffect(() => {
  //   if (layer.getStyle() !== options.style) {
  //     layer.setStyle(options.style);
  //   }
  // }, [layer, options.style]);
};
