import { useDebugValue, useMemo } from 'react';
import Graticule from 'ol/layer/Graticule';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { GraticuleLayerOptions } from './options';

/**
 * {@link Graticule}를 생성한다.
 * @param options - {@link GraticuleLayerOptions}
 *
 * @category Layers
 */
export const useGraticuleLayer = (options: Readonly<GraticuleLayerOptions>) => {
  useDebugValue(options);

  const layer = useMemo(() => {
    return new Graticule(options);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    options.maxLines,
    options.strokeStyle,
    options.targetSize,
    options.showLabels,
    options.lonLabelFormatter,
    options.latLabelFormatter,
    options.lonLabelPosition,
    options.latLabelPosition,
    options.lonLabelStyle,
    options.latLabelStyle,
    options.intervals,
  ]);

  useBaseVectorLayer<Feature, VectorSource<Feature>>(layer, options);

  return layer;
};
