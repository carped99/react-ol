import { GeoJSON as GeoJSONFormat } from 'ol/format';
import { Options as GeoJSONFormatOptions } from 'ol/format/GeoJSON';
import { Feature as OlFeature } from 'ol';
import {
  Geometry as OlGeometry,
  GeometryCollection as OlGeometryCollection,
  LineString as OlLineString,
  MultiLineString as OlMultiLineString,
  MultiPoint as OlMultiPoint,
  MultiPolygon as OlMultiPolygon,
  Point as OlPoint,
  Polygon as OlPolygon,
} from 'ol/geom';
import { FeatureLike } from 'ol/Feature';
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
import { WriteOptions } from 'ol/format/Feature';

/**
 * GeoJSON 관련 유틸리티 함수들
 *
 * OpenLayers의 Geometry/Feature 객체와 GeoJSON 형식 간의 변환을 위한 함수들을 제공합니다.
 * 기본적으로 EPSG:4326 좌표계를 사용합니다.
 */
const defaultFormat = new GeoJSONFormat<OlFeature<OlGeometry>>({
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857',
});

export type FormatOptions<T extends FeatureLike = OlFeature<OlGeometry>> = GeoJSONFormat<T> | GeoJSONFormatOptions<T>;

export function getFormat<T extends FeatureLike = OlFeature<OlGeometry>>(options?: FormatOptions<T>): GeoJSONFormat<T> {
  // 옵션이 이미 GeoJSONFormat 인스턴스인 경우 그대로 반환
  if (options instanceof GeoJSONFormat) {
    return options;
  }

  // 옵션이 없는 경우 기본 포맷 반환
  if (!options) {
    return defaultFormat as GeoJSONFormat<T>;
  }

  // 새로운 GeoJSONFormat 생성
  return new GeoJSONFormat(options);
}

// @formatter:off
// prettier-ignore
type GeometryToGeoJSONGeometry<T extends OlGeometry> = T extends OlPoint
  ? Point
  : T extends OlLineString
    ? LineString
    : T extends OlPolygon
      ? Polygon
      : T extends OlMultiPoint
        ? MultiPoint
        : T extends OlMultiLineString
          ? MultiLineString
          : T extends OlMultiPolygon
            ? MultiPolygon
            : T extends OlGeometryCollection
              ? GeometryCollection
              : Geometry;
// @formatter:on

export function writeFeatureObject<T extends OlGeometry>(feature: OlFeature<T>, options?: FormatOptions<OlFeature<T>>) {
  const format = getFormat(options);
  return format.writeFeatureObject(feature) as Feature<GeometryToGeoJSONGeometry<T>>;
}

export function writeFeaturesObject<T extends OlGeometry>(
  features: OlFeature<T>[],
  formatOptions?: FormatOptions<OlFeature<T>>,
  writeOptions?: WriteOptions,
) {
  const format = getFormat(formatOptions);
  return format.writeFeaturesObject(features, writeOptions) as FeatureCollection<GeometryToGeoJSONGeometry<T>>;
}

export function writeGeometryObject<T extends OlGeometry>(
  geometry: T,
  formatOptions?: FormatOptions<OlFeature<T>>,
  writeOptions?: WriteOptions,
) {
  const format = getFormat(formatOptions);
  return format.writeGeometryObject(geometry, writeOptions) as
    | GeometryToGeoJSONGeometry<T>
    | GeometryCollection<GeometryToGeoJSONGeometry<T>>;
}

export function readFeatures(...args: Parameters<GeoJSONFormat['readFeatures']>) {
  const [source, options] = args;
  const format = getFormat(options);
  return format.readFeatures(source);
}

export function readFeature(...args: Parameters<GeoJSONFormat['readFeature']>) {
  const [source, options] = args;
  const format = getFormat(options);
  return format.readFeature(source);
}

export function readGeometry(...args: Parameters<GeoJSONFormat['readGeometry']>) {
  const [source, options] = args;
  const format = getFormat(options);
  return format.readGeometry(source);
}

function createTypeGuard<T extends GeoJsonObject>(type: T['type']) {
  return (geometry?: GeoJsonObject | null): geometry is T => geometry != null && geometry.type === type;
}

// 더 구체적인 타입 정의
export const isPoint = createTypeGuard<Point>('Point');
export const isLineString = createTypeGuard<LineString>('LineString');
export const isPolygon = createTypeGuard<Polygon>('Polygon');
export const isMultiPoint = createTypeGuard<MultiPoint>('MultiPoint');
export const isMultiLineString = createTypeGuard<MultiLineString>('MultiLineString');
export const isMultiPolygon = createTypeGuard<MultiPolygon>('MultiPolygon');
export const isGeometryCollection = createTypeGuard<GeometryCollection>('GeometryCollection');
export const isFeature = createTypeGuard<Feature>('Feature');
export const isFeatureCollection = createTypeGuard<FeatureCollection>('FeatureCollection');

export function getFeaturesOrThrow(value?: GeoJsonObject | null): Feature[] {
  if (!value) {
    throw new Error('GeoJSON value is null or undefined');
  }

  if (isFeatureCollection(value)) {
    return value.features;
  }

  if (isFeature(value)) {
    return [value];
  }

  throw new Error(`Invalid GeoJSON type: ${value.type}`);
}

export function isGeometry(value?: GeoJsonObject | null): value is Geometry {
  if (!value) return false;
  return [
    'Point',
    'LineString',
    'Polygon',
    'MultiPoint',
    'MultiLineString',
    'MultiPolygon',
    'GeometryCollection',
  ].includes(value.type);
}

export function isPointFeature(feature: Feature): feature is Feature<Point> {
  return isPoint(feature.geometry);
}

export function isLineStringFeature(feature: Feature): feature is Feature<LineString> {
  return isLineString(feature.geometry);
}

export function isPolygonFeature(feature: Feature): feature is Feature<Polygon> {
  return isPolygon(feature.geometry);
}
