import type { Area } from 'convert';
import type { GeoJSON } from 'geojson';
import {
  GeometryCollection as OlGeometryCollection,
  MultiPolygon as OlMultiPolygon,
  Polygon as OlPolygon,
} from 'ol/geom.js';
import type { SphereMetricOptions } from 'ol/sphere.js';
import { getArea } from 'ol/sphere.js';
import { isGeoJson, readFeatures, readGeometry } from '../GeoJSONUtil';
import { FeatureOrGeometry, resolveGeometry } from '../Util/internal';
import { convertArea } from './convertUnit';

interface AreaOptions extends SphereMetricOptions {
  unit?: Area | 'py';
  geodesic: boolean;
  decimals?: number | undefined;
}

interface AreaResult {
  val: number;
  unit: string;
}

/**
 * 도형의 면적을 계산하고 지정된 단위로 반환
 */
export const calculateArea = (
  source: FeatureOrGeometry | GeoJSON | undefined | null,
  options: AreaOptions = {
    geodesic: true,
    decimals: 2,
  },
): AreaResult => {
  const { unit } = options;
  const area = calculateSquareArea(source, options);
  return convertArea(area, 'm2', unit);
};

export const calculateSquareArea = (
  source: FeatureOrGeometry | GeoJSON | undefined | null,
  options: AreaOptions,
): number => {
  if (source == null) return 0;

  const { geodesic, projection } = options;

  if (isGeoJson(source)) {
    switch (source.type) {
      case 'Feature':
      case 'FeatureCollection':
        return calculateSquareArea(readFeatures(source), options);
      default:
        return calculateSquareArea(readGeometry(source), options);
    }
  } else {
    const geometries = resolveGeometry(source);
    return geometries.reduce((acc, geometry) => {
      if (geometry == null) return acc;

      if (geodesic) {
        return acc + getArea(geometry, options);
      }

      const type = geometry.getType();
      switch (type) {
        case 'Polygon': {
          const geom = projection ? geometry.clone().transform(projection, 'EPSG:4326') : geometry;
          return acc + (geom as OlPolygon).getArea();
        }
        case 'MultiPolygon': {
          const geom = projection ? geometry.clone().transform(projection, 'EPSG:4326') : geometry;
          return acc + (geom as OlMultiPolygon).getArea();
        }
        case 'GeometryCollection':
          return acc + calculateSquareArea((geometry as OlGeometryCollection).getGeometries(), options);
        default:
          return acc;
      }
    }, 0);
  }
};

// const getAreaOfCircle = (circleGeom: OlCircle, options: AreaOptions): number => {
//   const sphericalUnits: Units[] = ['radians', 'degrees'];
//   const projectionUnits = map.getView().getProjection().getUnits();
//   const useSpherical = sphericalUnits.includes(projectionUnits);
//
//   if (useSpherical) {
//     // see https://math.stackexchange.com/questions/1832110/area-of-a-circle-on-sphere
//     // the radius of the earth - Clarke 1866 authalic Sphere
//     const earthRadius = 6371008.8;
//     const radius = circleGeom.getRadius();
//     let area = 2.0 * Math.PI * Math.pow(earthRadius, 2);
//     area *= 1 - Math.cos(radius / earthRadius);
//     return area;
//   } else {
//     return Math.PI * Math.pow(circleGeom.getRadius(), 2);
//   }
// };
