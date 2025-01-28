import type { Length } from 'convert';
import type { GeoJSON } from 'geojson';
import {
  Geometry as OlGeometry,
  GeometryCollection as OlGeometryCollection,
  LineString as OlLineString,
  MultiLineString as OlMultiLineString,
  Polygon as OlPolygon,
} from 'ol/geom.js';
import type { SphereMetricOptions } from 'ol/sphere.js';
import { getLength } from 'ol/sphere.js';
import { isGeoJson, readFeatures, readGeometry } from '../GeoJSONUtil';
import { FeatureOrGeometry, resolveGeometry } from '../Util/internal';
import { convertLength } from './convertUnit';

interface LengthOptions extends SphereMetricOptions {
  unit?: Length;
  geodesic: boolean;
  decimals?: number | undefined;
}

interface LengthResult {
  val: number;
  unit: string;
}

/**
 * 도형의 면적을 계산하고 지정된 단위로 반환
 */
export const calculateLength = (
  source: FeatureOrGeometry | GeoJSON,
  options: LengthOptions = {
    geodesic: true,
    decimals: 2,
  },
): LengthResult => {
  const { unit } = options;
  const area = calculateMeterLength(source, options);
  return convertLength(area, 'm', unit);
};

export const calculateMeterLength = (
  source: FeatureOrGeometry | GeoJSON | undefined | null,
  options: LengthOptions,
): number => {
  if (source == null) return 0;

  const { geodesic, projection } = options;

  if (isGeoJson(source)) {
    switch (source.type) {
      case 'Feature':
      case 'FeatureCollection':
        return calculateMeterLength(readFeatures(source), options);
      default:
        return calculateMeterLength(readGeometry(source), options);
    }
  } else {
    const geometries = resolveGeometry(source);
    return geometries.reduce((acc, geometry) => {
      if (geometry == null) return acc;

      if (geodesic) {
        return acc + getLength(geometry, options);
      }

      const type = geometry.getType();
      switch (type) {
        case 'LineString':
          return acc + transformGeometry<OlLineString>(geometry, projection).getLength();
        case 'Polygon':
          return acc + calculateMeterLength((geometry as OlPolygon).getLinearRings(), options);
        case 'MultiLineString':
          return acc + calculateMeterLength((geometry as OlMultiLineString).getLineStrings(), options);
        case 'GeometryCollection':
          return acc + calculateMeterLength((geometry as OlGeometryCollection).getGeometries(), options);
        default:
          return acc;
      }
    }, 0);
  }
};

const transformGeometry = <T extends OlGeometry>(
  geometry: OlGeometry,
  projection?: SphereMetricOptions['projection'],
): T => {
  return (projection ? geometry.clone().transform(projection, 'EPSG:4326') : geometry) as T;
};
