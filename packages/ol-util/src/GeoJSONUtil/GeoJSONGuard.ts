import {
  Feature,
  FeatureCollection,
  GeoJsonObject,
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';

type GuardFn<T extends GeoJsonObject> = (value: GeoJsonObject | undefined | null) => value is T;

const createGuardByType = <T extends GeoJsonObject>(type: T['type']): GuardFn<T> => {
  return (value): value is T => value != null && value.type === type;
};

const createFeatureGuard = <T extends Geometry>(geomGuard: GuardFn<T>) => {
  return (value: GeoJsonObject | undefined | null): value is Feature<T> => {
    return isFeature(value) && geomGuard(value.geometry);
  };
};

/**
 * GeoJSON Geometry 타입들의 리터럴 배열
 *
 * @see {@link Geometry} GeoJSON Geometry 타입 정의
 * @see https://tools.ietf.org/html/rfc7946#section-3.1 GeoJSON Geometry Types Specification
 */
const GEOMETRY_TYPES = [
  'Point',
  'LineString',
  'Polygon',
  'MultiPoint',
  'MultiLineString',
  'MultiPolygon',
  'GeometryCollection',
] as const satisfies readonly Geometry['type'][];

/**
 * GeoJSON 객체가 Geometry 타입인지 확인하는 타입 가드 함수
 * @param value - GeoJSON 객체
 *
 * @example
 * ```ts
 * const value = { type: 'Point', coordinates: [0, 0] };
 * if (isGeometry(value)) {
 *   // value는 Geometry 타입으로 추론됨
 * }
 * ```
 */
export const isGeometry: GuardFn<Geometry> = (value): value is Geometry => {
  return value != null && (value.type as Geometry['type']) in GEOMETRY_TYPES;
};

/**
 * `Point` 타입의 `Geometry`인지 확인하는 타입 가드 함수
 */
export const isPointGeometry = createGuardByType<Point>('Point');

/**
 * `LineString` 타입의 `Geometry`인지 확인하는 타입 가드 함수
 */
export const isLineGeometry = createGuardByType<LineString>('LineString');

/**
 * Polygon 타입의 `Geometry`인지 확인하는 타입 가드 함수
 */
export const isPolygonGeometry = createGuardByType<Polygon>('Polygon');

/**
 * MultiPoint 타입의 `Geometry`인지 확인하는 타입 가드 함수
 */
export const isMultiPointGeometry = createGuardByType<MultiPoint>('MultiPoint');

/**
 * MultiLineString 타입의 `Geometry`인지 확인하는 타입 가드 함수
 */
export const isMultiLineGeometry = createGuardByType<MultiLineString>('MultiLineString');

/**
 * MultiPolygon 타입의 `Geometry`인지 확인하는 타입 가드 함수
 */
export const isMultiPolygonGeometry = createGuardByType<MultiPolygon>('MultiPolygon');

/**
 * GeometryCollection 타입인지 확인하는 타입 가드 함수
 */
export const isGeometryCollection = createGuardByType<GeometryCollection>('GeometryCollection');

/**
 * Feature 타입인지 확인하는 타입 가드 함수
 */
export const isFeature = createGuardByType<Feature>('Feature');

/**
 * FeatureCollection 타입인지 확인하는 타입 가드 함수
 */
export const isFeatureCollection = createGuardByType<FeatureCollection>('FeatureCollection');

/**
 * Point Geometry를 포함하는 Feature인지 확인하는 타입 가드 함수
 */
export const isPointFeature = createFeatureGuard<Point>(isPointGeometry);

/**
 * LineString Geometry를 포함하는 Feature인지 확인하는 타입 가드 함수
 */
export const isLineFeature = createFeatureGuard<LineString>(isLineGeometry);

/**
 * Polygon Geometry를 포함하는 Feature인지 확인하는 타입 가드 함수
 */
export const isPolygonFeature = createFeatureGuard<Polygon>(isPolygonGeometry);

/**
 * MultiPoint Geometry를 포함하는 Feature인지 확인하는 타입 가드 함수
 */
export const isMultiPointFeature = createFeatureGuard<MultiPoint>(isMultiPointGeometry);

/**
 * MultiLineString Geometry를 포함하는 Feature인지 확인하는 타입 가드 함수
 */
export const isMultiLineFeature = createFeatureGuard<MultiLineString>(isMultiLineGeometry);

/**
 * MultiPolygon Geometry를 포함하는 Feature인지 확인하는 타입 가드 함수
 */
export const isMultiPolygonFeature = createFeatureGuard<MultiPolygon>(isMultiPolygonGeometry);

/**
 * {@link GeometryCollection}을 포함하는 Feature인지 확인하는 타입 가드 함수
 */
export const isGeometryCollectionFeature = createFeatureGuard<GeometryCollection>(isGeometryCollection);
