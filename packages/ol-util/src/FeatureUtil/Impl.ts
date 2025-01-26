import { difference as turfDiff, featureCollection } from '@turf/turf';
import OlFeature from 'ol/Feature.js';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON.js';
import {
  Geometry as OlGeometry,
  LineString as OlLineString,
  MultiPolygon as OlMultiPolygon,
  Polygon as OlPolygon,
} from 'ol/geom.js';
import { FormatOptions, readFeature, writeFeatureObject } from '../GeoJSONUtil/GeoJSONFormat';
import { splitPolygonByLine } from '../GeometryUtil';

export const getFeatureGeometry = <T extends OlGeometry>(feature: OlFeature<T> | OlFeature<T>[]): T[] => {
  if (Array.isArray(feature)) {
    return feature.flatMap((f) => (f ? getFeatureGeometry(f) : []));
  }
  const geometry = feature.getGeometry();
  return geometry ? [geometry] : [];
};

/**
 * Feature 배열을 특정 속성값으로 그룹화합니다.
 *
 * @param features - 그룹화할 Feature 배열
 * @param property - 그룹화 기준이 되는 속성 이름
 * @returns 속성값을 키로 하는 Feature 배열 맵
 *
 * @example
 * ```ts
 * const groupedByType = groupFeaturesByProperty(features, 'type');
 * const cities = groupedByType['city'];
 * ```
 */
export function groupFeaturesByProperty<T extends OlFeature<OlGeometry>>(
  features: readonly T[],
  property: string,
): Record<string, T[]> {
  return features.reduce(
    (groups, feature) => {
      const value = String(feature.get(property));
      (groups[value] ??= []).push(feature);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

export const cloneFeature = <T extends OlGeometry>(
  feature: OlFeature<T>,
  options?: { deep?: boolean },
): OlFeature<T> => {
  const { deep = false } = options || {};

  const clone = new OlFeature<T>();
  const properties = { ...feature.getProperties() };

  if (deep) {
    const geometry = feature.getGeometry();
    if (geometry) {
      clone.setGeometry(geometry.clone() as T);
      delete properties.geometry;
    }
  }

  clone.setProperties(properties);
  return clone;
};

/**
 * Feature 배열을 특정 속성값을 기준으로 정렬합니다.
 *
 * @param features - 정렬할 Feature 배열
 * @param property - 정렬 기준이 되는 속성 이름
 * @param options - 정렬 옵션
 * @returns 정렬된 Feature 배열
 *
 * @example
 * ```ts
 * // 오름차순 정렬
 * const sorted = sortFeatures(features, 'name');
 *
 * // 내림차순 정렬
 * const sortedDesc = sortFeatures(features, 'name', { descending: true });
 * ```
 */
export function sortFeatures<T extends OlFeature<OlGeometry>>(
  features: readonly T[],
  property: string,
  { descending = false }: { descending?: boolean } = {},
): T[] {
  return sortFeaturesBy(features, compareByProperty(property, descending));
}

export function sortFeaturesBy<T extends OlFeature<OlGeometry>>(
  features: readonly T[],
  comparator: (a: T, b: T) => number,
): T[] {
  return [...features].sort(comparator);
}

const compareByProperty =
  (property: string, descending = false) =>
  (a: OlFeature<OlGeometry>, b: OlFeature<OlGeometry>): number => {
    const [valueA, valueB] = [a.get(property), b.get(property)];

    if (valueA == null || valueB == null) return valueA == null ? 1 : -1;
    const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;

    return descending ? -comparison : comparison;
  };

export const difference = (
  polygon1: OlFeature<OlPolygon> | OlPolygon,
  polygon2: OlFeature<OlPolygon> | OlPolygon,
  projection: FormatOptions<OlFeature<OlPolygon>>,
): OlMultiPolygon | OlPolygon | OlFeature<OlMultiPolygon | OlPolygon> => {
  const differenceGeometry = geometryDifference(getGeometry(polygon1), getGeometry(polygon2), projection);
  if (polygon1 instanceof OlFeature && polygon2 instanceof OlFeature) {
    return new OlFeature(differenceGeometry);
  } else {
    return differenceGeometry;
  }
};

const geometryDifference = (
  polygon1: OlPolygon,
  polygon2: OlPolygon,
  projection: FormatOptions<OlFeature<OlPolygon>>,
): OlMultiPolygon | OlPolygon => {
  const geojson1 = writeFeatureObject(new OlFeature(polygon1), projection);
  const geojson2 = writeFeatureObject(new OlFeature(polygon2), projection);

  const collection = featureCollection([geojson1, geojson2]);

  const intersection = turfDiff(collection);
  const feature = readFeature(intersection) as OlFeature<OlPolygon | OlMultiPolygon>;
  return feature.getGeometry() as OlMultiPolygon | OlPolygon;
};

const getGeometry = <T extends OlGeometry>(source: OlFeature<T> | T) => {
  if (source instanceof OlFeature) {
    const geom = source.getGeometry();
    if (geom == null) {
      throw new Error('Feature has no geometry.');
    }
    return geom;
  } else {
    return source;
  }
};

/**
 * 폴리곤을 라인으로 분할합니다.
 *
 * @param polygon - 분할할 폴리곤
 * @param line - 분할에 사용할 라인
 * @param options - GeoJSON 변환 옵션
 * @returns 분할된 폴리곤 배열
 *
 * @example
 * ```ts
 * const splitPolygons = splitByLine(polygon, line, {
 *   dataProjection: 'EPSG:4326',
 *   featureProjection: 'EPSG:3857'
 * });
 * ```
 */
export const splitByLine = (
  polygon: OlFeature<OlPolygon> | OlPolygon,
  line: OlFeature<OlLineString> | OlLineString,
  options: GeoJSONFormatOptions = {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  },
): OlPolygon[] => {
  return splitPolygonByLine(getGeometry(polygon), getGeometry(line), options);
};
