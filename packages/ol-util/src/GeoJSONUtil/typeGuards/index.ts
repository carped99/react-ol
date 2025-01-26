import type {
  Feature,
  FeatureCollection,
  GeoJsonGeometryTypes,
  GeoJsonObject,
  GeoJsonTypes,
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';

/**
 * 주어진 값의 타입을 좁히는 함수의 기본 타입 정의
 * unknown 또는 null/undefined 타입의 값을 받아서 특정 타입인지 검사하고,
 * TypeScript의 타입 시스템에서 해당 타입으로 좁혀주는 역할을 합니다.
 */
type GuardFn<T> = (value: unknown | undefined | null) => value is T;

// GeoJSON 타입 상수 정의
const GEOMETRY_TYPES = [
  'Point',
  'LineString',
  'Polygon',
  'MultiPoint',
  'MultiLineString',
  'MultiPolygon',
  'GeometryCollection',
] as const satisfies readonly GeoJsonGeometryTypes[];

const GEOJSON_TYPES = [...GEOMETRY_TYPES, 'Feature', 'FeatureCollection'] as const satisfies readonly GeoJsonTypes[];

/**
 * 주어진 값이 GeoJSON 객체의 기본 요구사항을 만족하는지 검사하는 함수
 * GeoJSON 객체는 반드시 type 속성을 가져야 하며, 이 `type`은 GeoJSON 명세에 정의된 값이어야 합니다.
 *
 * @param value - 검사할 값
 */
export const isGeoJson = (value: unknown): value is GeoJsonObject => {
  if (!value || typeof value !== 'object') return false;
  const type = (value as { type?: unknown }).type;
  return typeof type === 'string' && GEOJSON_TYPES.includes(type as GeoJsonTypes);
};

/**
 * 주어진 값이 GeoJSON Geometry 객체인지 검사하는 함수
 * Geometry 객체는 Point, LineString, Polygon 등의 공간 데이터를 표현하는 GeoJSON 타입입니다.
 *
 * @param value - 검사할 값
 * @returns 값이 GeoJSON Geometry 객체인지 여부
 */
export const isGeometry = (value: unknown): value is Geometry => {
  return isGeoJson(value) && GEOMETRY_TYPES.includes(value.type as GeoJsonGeometryTypes);
};

/**
 * GeoJSON 타입별 검사 함수를 생성하는 유틸리티 함수
 * 주어진 GeoJSON 타입에 대해 해당 타입인지 검사하는 함수를 반환합니다.
 *
 * @param type - 검사할 GeoJSON 타입 문자열
 * @returns 주어진 타입의 GeoJSON 객체인지 검사하는 함수
 */
const createGuardByType =
  <T extends GeoJsonObject>(type: T['type']): GuardFn<T> =>
  (value): value is T =>
    isGeoJson(value) && value.type === type;

/**
 * 주어진 값이 지정된 GeoJSON Geometry 타입들 중 하나인지 검사하는 함수
 * 여러 Geometry 타입을 한번에 검사할 수 있습니다.
 *
 * @param value - 검사할 값
 * @param types - 허용할 Geometry 타입들의 배열
 * @returns 값이 지정된 Geometry 타입들 중 하나인지 여부
 *
 * @example
 * ```ts
 * const geom = { type: 'Point', coordinates: [0, 0] };
 * if (isAnyGeometry(geom, 'Point', 'LineString')) {
 *   // 이 시점에서 geom은 Point 또는 LineString 타입으로 처리됨
 *   console.log(geom.coordinates);
 * }
 * ```
 */
export const isAnyGeometry = <T extends Geometry['type']>(
  value: unknown,
  ...types: T[]
): value is Extract<Geometry, { type: T }> => isGeometry(value) && types.includes(value.type as T);

/**
 * 주어진 값이 GeoJSON Point Geometry 객체인지 확인
 */
export const isPointGeometry = createGuardByType<Point>('Point');

/**
 * LineString Geometry 타입인지 확인
 */
export const isLineGeometry = createGuardByType<LineString>('LineString');

/**
 * Polygon Geometry 타입인지 확인
 */
export const isPolygonGeometry = createGuardByType<Polygon>('Polygon');

/**
 * MultiPoint Geometry 타입인지 확인
 */
export const isMultiPointGeometry = createGuardByType<MultiPoint>('MultiPoint');

/**
 * MultiLineString Geometry 타입인지 확인
 */
export const isMultiLineGeometry = createGuardByType<MultiLineString>('MultiLineString');

/**
 * MultiPolygon Geometry 타입인지 확인
 */
export const isMultiPolygonGeometry = createGuardByType<MultiPolygon>('MultiPolygon');

/**
 * GeometryCollection Geometry 타입인지 확인
 */
export const isGeometryCollection = createGuardByType<GeometryCollection>('GeometryCollection');

/**
 * GeoJSON Feature 타입인지 확인
 */
export const isFeature = <T extends Geometry['type'] | undefined = undefined>(
  value: unknown,
  geometryType?: T,
): value is Feature<T extends Geometry['type'] ? Extract<Geometry, { type: T }> : Geometry> => {
  try {
    assertFeature(value, geometryType);
    return true;
  } catch {
    return false;
  }
};

type ValidationError = Error & {
  value: unknown;
  details: {
    expected: string;
    received: unknown;
  };
};

const createValidationError = (
  message: string,
  value: unknown,
  details: {
    expected: string;
    received: unknown;
  },
): ValidationError => {
  const error = new Error(message) as ValidationError;
  error.name = 'ValidationError';
  error.value = value;
  error.details = details;
  return error;
};

/**
 * 주어진 값이 GeoJSON Feature인지 검증합니다.
 * 유효하지 않은 경우 ValidationError를 발생시킵니다.
 *
 * @param value - 검증할 값
 * @param geometryType - 검증할 geometry 타입 (선택사항)
 *
 * @example
 * ```typescript
 * // 기본 사용
 * assertFeature(value);
 *
 * // geometry 타입 지정
 * assertFeature(value, 'Polygon');
 *
 * // 에러 처리
 * try {
 *   assertFeature(value);
 * } catch (error) {
 *   if (error instanceof Error && 'details' in error) {
 *     console.error(error.details);
 *   }
 * }
 * ```
 */
export function assertFeature<T extends Geometry['type'] | undefined = undefined>(
  value: unknown,
  geometryType?: T,
): asserts value is Feature<T extends Geometry['type'] ? Extract<Geometry, { type: T }> : Geometry> {
  if (!value) {
    throw createValidationError('Feature cannot be null or undefined', value, {
      expected: 'Feature object',
      received: value,
    });
  }

  if (typeof value !== 'object') {
    throw createValidationError('Feature must be an object', value, { expected: 'object', received: typeof value });
  }

  const feature = value as Feature;

  if (feature.type !== 'Feature') {
    throw createValidationError('Invalid feature type', value, { expected: 'Feature', received: feature.type });
  }

  if (!feature.geometry) {
    throw createValidationError('Feature must have geometry', value, {
      expected: 'geometry object',
      received: feature.geometry,
    });
  }

  if (geometryType && feature.geometry.type !== geometryType) {
    throw createValidationError(`Feature geometry must be type "${geometryType}"`, value, {
      expected: geometryType,
      received: feature.geometry.type,
    });
  }
}

/**
 * GeoJSON FeatureCollection 타입인지 확인
 */
export const isFeatureCollection = <T extends Geometry['type'] | undefined = undefined>(
  value: unknown,
  geometryType?: T,
): value is FeatureCollection<T extends Geometry['type'] ? Extract<Geometry, { type: T }> : Geometry> => {
  if (!value || typeof value !== 'object') return false;

  const collection = value as FeatureCollection;
  if (collection.type !== 'FeatureCollection' || !Array.isArray(collection.features)) {
    return false;
  }

  if (geometryType) {
    return collection.features.every((feature) => feature.geometry?.type === geometryType);
  }

  return true;
};

export function assertFeatureCollection<T extends Geometry['type'] | undefined = undefined>(
  value: unknown,
  geometryType?: T,
): asserts value is FeatureCollection<T extends Geometry['type'] ? Extract<Geometry, { type: T }> : Geometry> {
  if (!value) {
    throw createValidationError('FeatureCollection cannot be null or undefined', value, {
      expected: 'FeatureCollection object',
      received: value,
    });
  }

  if (typeof value !== 'object') {
    throw createValidationError('FeatureCollection must be an object', value, {
      expected: 'object',
      received: typeof value,
    });
  }

  const collection = value as FeatureCollection;

  if (collection.type !== 'FeatureCollection') {
    throw createValidationError('Invalid GeoJSON type', value, {
      expected: 'FeatureCollection',
      received: collection.type,
    });
  }

  if (!Array.isArray(collection.features)) {
    throw createValidationError('features must be an array', value, {
      expected: 'array',
      received: typeof collection.features,
    });
  }

  // 각 feature 검증
  collection.features.forEach((feature, index) => {
    try {
      assertFeature(feature, geometryType);
    } catch (error) {
      if (error instanceof Error && 'details' in error) {
        const validationError = error as ValidationError;
        throw createValidationError(`Invalid feature at index ${index}: ${error.message}`, feature, {
          expected: validationError.details.expected,
          received: validationError.details.received,
        });
      }
      throw error;
    }
  });
}
