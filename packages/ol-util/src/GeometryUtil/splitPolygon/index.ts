import { flatten } from '@turf/turf';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON';
import { LineString as OlLineString, Polygon as OlPolygon } from 'ol/geom';
import polygonSplitter from 'polygon-splitter';
import { readGeometry, writeGeometryObject } from '../../GeoJSONUtil/GeoJSONFormat';

/**
 * 폴리곤을 라인으로 분할하는 내부 함수입니다.
 *
 * @param polygon - 분할할 폴리곤
 * @param line - 분할에 사용할 라인
 * @param options - GeoJSON 변환 옵션
 * @returns 분할된 폴리곤 배열
 *
 * @internal
 */
export const splitPolygonByLine = (
  polygon: OlPolygon,
  line: OlLineString,
  options?: GeoJSONFormatOptions,
): OlPolygon[] => {
  const polyJson = writeGeometryObject(polygon, options);
  const lineJson = writeGeometryObject(line, options);

  return flatten(polygonSplitter(polyJson, lineJson)).features.map(
    (feature) => readGeometry(feature.geometry, options) as OlPolygon,
  );
};
