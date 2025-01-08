import { Collection, Feature as OlFeature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { createEmpty, extend, Extent, getCenter } from 'ol/extent';
import {
  Geometry as OlGeometry,
  LineString as OlLineString,
  MultiPolygon as OlMultiPolygon,
  Polygon as OlPolygon,
} from 'ol/geom';
import { difference as turfDiff, featureCollection } from '@turf/turf';
import { FormatOptions, readFeature, writeFeatureObject } from './GeoJSONFormat';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON';
import { splitPolygonByLine } from './GeometryUtil';
import { AlwaysTrue, FeatureFilter } from './common';
import VectorSource from 'ol/source/Vector';
import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';

/**
 * OpenLayers Feature 객체를 다루기 위한 유틸리티 함수들을 제공합니다.
 * @packageDocumentation
 */
type PropertyValidator = (value: unknown) => boolean;
// 타입 정의
type FeatureSources<T extends OlGeometry> =
  | OlFeature<T>[]
  | Collection<OlFeature<T>>
  | VectorLayer<VectorSource<OlFeature<T>>>
  | VectorSource<OlFeature<T>>;

export const getFeatureGeometry = <T extends OlGeometry>(feature: OlFeature<T> | OlFeature<T>[]): T[] => {
  if (Array.isArray(feature)) {
    return feature.flatMap((f) => (f ? getFeatureGeometry(f) : []));
  }
  const geometry = feature.getGeometry();
  return geometry ? [geometry] : [];
};

export const getFeatureExtent = (feature: OlFeature | OlFeature[]): Extent => {
  const geometries = getFeatureGeometry(feature);

  return geometries.reduce((acc, geometry) => {
    const extent = geometry.getExtent();
    return extent ? extend(acc, extent) : acc;
  }, createEmpty());
};

/**
 * Feature의 중심 좌표를 계산합니다.
 *
 * @param feature - 중심 좌표를 계산할 OpenLayers Feature
 * @returns Feature의 extent 중심 좌표
 * @throws {Error} Feature에 geometry가 없는 경우
 *
 * @example
 * ```typescript
 * const center = getFeatureCenter(feature);
 * map.getView().setCenter(center);
 * ```
 */
export const getFeatureCenter = (feature: OlFeature): Coordinate => {
  const extent = getGeometry(feature).getExtent();
  return getCenter(extent);
};

/**
 * Feature의 속성을 업데이트합니다.
 *
 * @param feature - 속성을 업데이트할 Feature
 * @param properties - 설정할 속성 객체
 */
export const mergeProperties = (feature: OlFeature, properties: Record<string, any>) => {
  feature.setProperties({ ...feature.getProperties(), ...properties });
};

/**
 * Feature 배열에서 특정 속성값을 가진 Feature들을 필터링합니다.
 *
 * @param source - 필터링할 Feature 배열
 * @param property - 필터링할 속성 이름
 * @param value - 필터링할 속성값
 * @returns 필터링된 Feature 배열
 *
 * @example
 * ```typescript
 * const cityFeatures = findFeaturesByProperty(source, 'type', 'city');
 * ```
 */
export const findAllFeatureByProperty = <T extends OlGeometry>(
  source: FeatureSources<T> | undefined | null,
  property: string,
  value: any,
) => {
  return findAllFeature(source, (feature) => feature.get(property) === value);
};

/**
 * 주어진 조건에 맞는 모든 피처를 찾습니다.
 *
 * @param source - 검색할 피처 배열
 * @param filter - 필터 조건 함수 (선택적)
 * @returns 조건에 맞는 피처 배열
 *
 * @example
 * ```
 * // 모든 피처 반환
 * const allFeatures = findAllFeatures(source);
 *
 * // 특정 조건의 피처만 반환
 * const selectedFeatures = findAllFeatures(source,
 *   feature => feature.get('type') === 'point'
 * );
 * ```
 */
export const findAllFeature = <T extends OlGeometry>(
  source: FeatureSources<T> | undefined | null,
  filter: FeatureFilter<T> = AlwaysTrue,
) => {
  // null, undefined, 빈 배열 처리
  if (!source) return [];
  return Array.from(iterateFeature(source, filter));
};

export const findFeature = <T extends OlGeometry>(
  source: FeatureSources<T> | undefined | null,
  filter: FeatureFilter<T> = AlwaysTrue,
): OlFeature<T> | undefined => {
  if (source) {
    const iter = iterateFeature(source, filter);
    const result = iter.next();
    return result.done ? undefined : result.value;
  }
  return undefined;
};

export const iterateFeature = function* <T extends OlGeometry>(
  source: FeatureSources<T> | undefined | null,
  filter: FeatureFilter<T> = AlwaysTrue,
): Generator<OlFeature<T>> {
  if (!source) return;
  for (const feature of iterateFeatureInternal(source)) {
    if (filter(feature)) {
      yield feature;
    }
  }
};

export const findFeatureByProperty = <T extends OlGeometry>(
  source: FeatureSources<T> | undefined | null,
  property: string,
  value: any,
) => {
  return findFeature(source, (feature) => feature.get(property) === value);
};

/**
 * Feature 배열을 특정 속성값으로 그룹화합니다.
 *
 * @param features - 그룹화할 Feature 배열
 * @param property - 그룹화 기준이 되는 속성 이름
 * @returns 속성값을 키로 하는 Feature 배열 맵
 *
 * @example
 * ```typescript
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

/**
 * Feature를 복제합니다.
 *
 * @param feature - 복제할 Feature
 * @param options - 복제 옵션
 * @param options.deep - true인 경우 geometry도 복제 (기본값: false)
 * @returns 복제된 Feature
 *
 * @example
 * ```typescript
 * // 얕은 복사
 * const clone = cloneFeature(feature);
 *
 * // 깊은 복사 (geometry도 복제)
 * const deepClone = cloneFeature(feature, { deep: true });
 * ```
 */
export const cloneFeature = <T extends OlGeometry>(
  feature: OlFeature<T>,
  { deep = false }: { deep?: boolean } = {},
): OlFeature<T> => {
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
 * Feature의 특정 속성 존재 여부를 확인합니다.
 *
 * @param feature - 확인할 Feature
 * @param property - 확인할 속성 이름
 * @returns 속성 존재 여부
 *
 * @example
 * ```typescript
 * if (hasProperty(feature, 'name')) {
 *   console.log(feature.get('name'));
 * }
 * ```
 */
export const hasProperty = (feature: OlFeature<OlGeometry>, property: string): boolean => {
  return Object.prototype.hasOwnProperty.call(feature.getProperties(), property);
};

/**
 * Feature의 모든 속성을 제거합니다.
 *
 * @param feature - 속성을 제거할 Feature
 * @param exclude - 제거하지 않을 속성 이름 배열
 *
 * @example
 * ```typescript
 * // 모든 속성 제거
 * clearProperties(feature);
 *
 * // id 속성은 유지하고 나머지 제거
 * clearProperties(feature, ['id']);
 * ```
 */
export const clearProperties = (feature: OlFeature<OlGeometry>, exclude: readonly string[] = []) => {
  const geometry = feature.getGeometry();

  // 제외할 프로퍼티를 유지하며 나머지는 제거
  const preservedProps = Object.fromEntries(
    exclude.map((prop) => [prop, feature.get(prop)]).filter(([, value]) => value !== undefined),
  );

  feature.setProperties(preservedProps);
  if (geometry) {
    feature.setGeometry(geometry); // 지오메트리를 다시 설정
  }
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
 * ```typescript
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

/**
 * Feature의 속성값이 주어진 스키마에 맞는지 검증합니다.
 *
 * @param feature - 검증할 Feature
 * @param schema - 속성별 검증 함수를 담은 객체
 * @returns 검증 결과
 *
 * @example
 * ```typescript
 * const schema = {
 *   name: (value) => typeof value === 'string',
 *   population: (value) => typeof value === 'number' && value >= 0
 * };
 *
 * if (validateFeatureProperties(feature, schema)) {
 *   console.log('Valid feature');
 * }
 * ```
 */
export function validateFeatureProperties(
  feature: OlFeature<OlGeometry>,
  schema: Record<string, PropertyValidator>,
): boolean {
  const properties = feature.getProperties();
  return Object.entries(schema).every(([prop, validate]) => validate(properties[prop]));
}

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
 * ```typescript
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

const resolveFeatures = <T extends OlGeometry>(source: FeatureSources<T>): OlFeature<T>[] => {
  if (isVectorLayer<T>(source)) {
    return source.getSource()?.getFeatures() ?? [];
  } else if (isVectorSource<T>(source)) {
    return source.getFeatures();
  } else if (isFeatureCollection<T>(source)) {
    return source.getArray();
  }

  return source;
};

const iterateFeatureInternal = <T extends OlGeometry>(source: FeatureSources<T>): Generator<OlFeature<T>> => {
  return (function* () {
    if (isVectorLayer<T>(source)) {
      const vectorSource = source.getSource();
      if (vectorSource) {
        yield* vectorSource.getFeatures();
      }
    } else if (isVectorSource<T>(source)) {
      yield* source.getFeatures();
    } else if (isFeatureCollection<T>(source)) {
      yield* source.getArray();
    } else if (Array.isArray(source)) {
      yield* source;
    }
  })();
};

// 타입 가드 함수
const isLayer = (source: any): source is BaseLayer => {
  return source instanceof BaseLayer;
};

const isVectorLayer = <T extends OlGeometry>(
  source: FeatureSources<T>,
): source is VectorLayer<VectorSource<OlFeature<T>>> => {
  return source instanceof VectorLayer;
};
const isVectorSource = <T extends OlGeometry>(source: any): source is VectorSource<OlFeature<T>> => {
  return source instanceof VectorSource;
};

const isFeatureCollection = <T extends OlGeometry>(source: any): source is Collection<OlFeature<T>> => {
  return source instanceof Collection;
};

const isFeatureArray = <T extends OlGeometry>(source: any): source is OlFeature<T>[] => {
  return Array.isArray(source);
};
