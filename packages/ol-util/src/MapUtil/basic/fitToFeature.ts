import Map from 'ol/Map';
import { FitOptions } from 'ol/View';
import { fitToExtent } from './fitToExtent';
import { Features } from '../../common';
import { FeatureUtil } from '../../FeatureUtil';

/**
 * 지정된 Feature가 지도에 완전히 보이도록 뷰를 조정합니다.
 * @param map - OpenLayers Map 인스턴스
 * @param feature - 표시할 Feature 또는 Feature 배열
 * @param options - fit 옵션
 */
export const fitToFeature = (map: Map, feature: Features, options?: FitOptions) => {
  const extent = FeatureUtil.getFeatureExtent(feature);
  fitToExtent(map, extent, options);
};
