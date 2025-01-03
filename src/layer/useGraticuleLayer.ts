import { useDebugValue, useMemo } from 'react';
import Graticule, { Options } from 'ol/layer/Graticule';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';

/**
 * {@link Graticule}의 옵션
 *
 * @category Layer Option
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GraticuleLayerOptions extends Options {}

/**
 * {@link Graticule}를 생성한다.
 * @param options - {@link GraticuleLayerOptions}
 *
 * @category Layer
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
