import { useMemo } from 'react';
import Graticule, { Options } from 'ol/layer/Graticule';
import { useBaseVectorLayer } from '@src/hooks/layer/base/useBaseVectorLayer';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';

export type GraticuleLayerOptions = Options & {};

/**
 * {@link Graticule}를 생성한다.
 * @param options {@link GraticuleLayerOptions}
 */
export const useGraticuleLayer = (options: GraticuleLayerOptions) => {
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
