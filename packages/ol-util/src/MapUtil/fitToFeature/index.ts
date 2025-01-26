import * as turf from '@turf/turf';
import type { GeoJSON } from 'geojson';
import Map from 'ol/Map.js';
import { FitOptions } from 'ol/View.js';
import { findExtent } from '../../FeatureUtil';
import { isGeoJson } from '../../GeoJSONUtil';
import { FeatureOrGeometry } from '../../Util/internal';
import { fitToExtent } from '../fitToExtent';

/**
 * 지정된 Feature가 지도에 완전히 보이도록 뷰를 조정합니다.
 * @param map - OpenLayers Map 인스턴스
 * @param feature - 표시할 Feature 또는 Feature 배열
 * @param options - fit 옵션
 */
export const fitToFeature = (map: Map, feature: FeatureOrGeometry | GeoJSON, options?: FitOptions) => {
  const extent = isGeoJson(feature) ? turf.bbox(feature) : findExtent(feature);
  if (extent) {
    fitToExtent(map, extent, options);
  }
};
