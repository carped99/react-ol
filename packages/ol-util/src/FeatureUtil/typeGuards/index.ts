import { Collection, Feature } from 'ol';
import { Geometry, LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from 'ol/geom';
import VectorSource from 'ol/source/Vector';

/**
 * 주어진 객체가 VectorSource 인스턴스인지 확인합니다.
 *
 * @param source - 검사할 객체
 * @returns VectorSource 인스턴스 여부
 */
export const isVectorSource = <T extends Geometry>(source: unknown): source is VectorSource<Feature<T>> => {
  return source instanceof VectorSource;
};

/**
 * 주어진 객체가 Feature Collection인지 확인합니다.
 *
 * @param source - 검사할 객체
 * @returns Feature Collection 여부
 */
export const isCollection = <T extends Geometry>(source: unknown): source is Collection<Feature<T>> => {
  return source instanceof Collection;
};

/**
 * 주어진 객체가 OpenLayers Feature인지 확인합니다.
 *
 * @param feature - 검사할 객체
 * @returns OpenLayers Feature 여부
 */
export const isFeature = <T extends Geometry>(feature: unknown): feature is Feature<T> => {
  return feature instanceof Feature;
};

/**
 * Feature의 geometry가 Point인지 확인합니다.
 *
 * @param feature - 검사할 Feature
 * @returns Point geometry 여부
 */
export const isPointFeature = (feature: Feature<Geometry>): feature is Feature<Point> => {
  return feature.getGeometry() instanceof Point;
};

/**
 * Feature의 geometry가 LineString인지 확인합니다.
 *
 * @param feature - 검사할 Feature
 * @returns LineString geometry 여부
 */
export const isLineFeature = (feature: Feature<Geometry>): feature is Feature<LineString> => {
  return feature.getGeometry() instanceof LineString;
};

/**
 * Feature의 geometry가 Polygon인지 확인합니다.
 *
 * @param feature - 검사할 Feature
 * @returns Polygon geometry 여부
 */
export const isPolygonFeature = (feature: Feature<Geometry>): feature is Feature<Polygon> => {
  return feature.getGeometry() instanceof Polygon;
};

/**
 * Feature의 geometry가 MultiPoint인지 확인합니다.
 *
 * @param feature - 검사할 Feature
 * @returns MultiPoint geometry 여부
 */
export const isMultiPointFeature = (feature: Feature<Geometry>): feature is Feature<MultiPoint> => {
  return feature.getGeometry() instanceof MultiPoint;
};

/**
 * Feature의 geometry가 MultiLineString인지 확인합니다.
 *
 * @param feature - 검사할 Feature
 * @returns MultiLineString geometry 여부
 */
export const isMultiLineFeature = (feature: Feature<Geometry>): feature is Feature<MultiLineString> => {
  return feature.getGeometry() instanceof MultiLineString;
};

/**
 * Feature의 geometry가 MultiPolygon인지 확인합니다.
 *
 * @param feature - 검사할 Feature
 * @returns MultiPolygon geometry 여부
 */
export const isMultiPolygonFeature = (feature: Feature<Geometry>): feature is Feature<MultiPolygon> => {
  return feature.getGeometry() instanceof MultiPolygon;
};

/**
 * Feature가 유효한 geometry를 가지고 있는지 확인합니다.
 *
 * @param feature - 검사할 Feature
 * @returns geometry 존재 여부
 */
export const hasGeometry = (feature: Feature<Geometry>): boolean => {
  return feature.getGeometry() != null;
};
