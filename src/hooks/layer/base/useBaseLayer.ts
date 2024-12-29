import { useDebugValue, useEffect } from 'react';
import BaseLayer, { Options as BaseOptions } from 'ol/layer/Base';
import { equals as equalsExtent } from 'ol/extent';

export const useBaseLayer = (layer: BaseLayer, options: Readonly<BaseOptions>) => {
  useDebugValue(layer);

  useEffect(() => {
    if (layer == null) throw new Error('layer is required');
  }, [layer]);

  useEffect(() => {
    if (options.minZoom != null && layer.getMinZoom() !== options.minZoom) {
      layer.setMinZoom(options.minZoom);
    }
  }, [layer, options.minZoom]);

  useEffect(() => {
    if (options.maxZoom != null && layer.getMaxZoom() !== options.maxZoom) {
      layer.setMaxZoom(options.maxZoom);
    }
  }, [layer, options.maxZoom]);

  useEffect(() => {
    if (options.minResolution != null && layer.getMinResolution() !== options.minResolution) {
      layer.setMinResolution(options.minResolution);
    }
  }, [layer, options.minResolution]);

  useEffect(() => {
    if (options.maxResolution != null && layer.getMaxResolution() !== options.maxResolution) {
      layer.setMaxResolution(options.maxResolution);
    }
  }, [layer, options.maxResolution]);

  useEffect(() => {
    if (options.zIndex != null && layer.getZIndex() !== options.zIndex) {
      layer.setZIndex(options.zIndex);
    }
  }, [layer, options.zIndex]);

  useEffect(() => {
    if (options.opacity != null && layer.getOpacity() !== options.opacity) {
      layer.setOpacity(options.opacity);
    }
  }, [layer, options.opacity]);

  useEffect(() => {
    if (options.visible != null && layer.getVisible() !== options.visible) {
      layer.setVisible(options.visible);
    }
  }, [layer, options.visible]);

  useEffect(() => {
    const prev = layer.getExtent();

    if (prev === options.extent) return;

    if (prev != null && options.extent != null && equalsExtent(prev, options.extent)) return;

    layer.setExtent(options.extent);
  }, [layer, options.extent]);

  useEffect(() => {
    const prev = layer.getBackground();

    if (prev === options.background) return;

    layer.setBackground(options.background);
  }, [layer, options.background]);

  useEffect(() => {
    if (options.properties != null) {
      layer.setProperties(options.properties);
    }
  }, [layer, options.properties]);
};
