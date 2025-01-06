import { useDebugValue } from 'react';
import Graticule from 'ol/layer/Graticule';
import { GraticuleLayerOptions } from './options';
import { createBaseObjectProvider } from '../hooks/BaseObjectProvider';
import { useInstance } from '../hooks/useInstance';
import { useBaseVectorLayer } from './base/useBaseVectorLayer';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';

/**
 * {@link Graticule}를 생성한다.
 * @param options - {@link GraticuleLayerOptions}
 *
 * @category Layers
 */
export const useGraticuleLayer = (options: Readonly<GraticuleLayerOptions>) => {
  useDebugValue(options);

  const instance = useInstance(provider, options);

  useBaseVectorLayer<Feature<Geometry>, VectorSource<Feature<Geometry>>>(instance, options);

  return instance;

  // const layer = useMemo(() => {
  //   return new Graticule(options);
  //
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   options.maxLines,
  //   options.strokeStyle,
  //   options.targetSize,
  //   options.showLabels,
  //   options.lonLabelFormatter,
  //   options.latLabelFormatter,
  //   options.lonLabelPosition,
  //   options.latLabelPosition,
  //   options.lonLabelStyle,
  //   options.latLabelStyle,
  //   options.intervals,
  // ]);
  //
  // useBaseVectorLayer<Feature, VectorSource<Feature>>(layer, options);
  //
  // return layer;
};

const create = (options: Readonly<GraticuleLayerOptions>) => new Graticule(options);

const provider = createBaseObjectProvider(create);
