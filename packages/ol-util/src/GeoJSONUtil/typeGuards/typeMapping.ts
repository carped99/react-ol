import {
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
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
import { Type as OlGeometryType } from 'ol/geom/Geometry';

type GeometryTypeMap = {
  Point: OlPoint;
  LineString: OlLineString;
  Polygon: OlPolygon;
  MultiPoint: OlMultiPoint;
  MultiLineString: OlMultiLineString;
  MultiPolygon: OlMultiPolygon;
  GeometryCollection: OlGeometryCollection;
};

/**
 * GeoJSON `Geometry`를 OpenLayers `Geometry`로 매핑하는 타입
 */
export type MapToOlGeometry<T extends Geometry> = T extends { type: keyof GeometryTypeMap }
  ? GeometryTypeMap[T['type']]
  : OlGeometry;

/**
 * OpenLayers GeometryType을 GeoJSON Geometry로 매핑하는 타입
 */
type OlGeometryTypeMap = Record<OlGeometryType, Geometry> & {
  Point: Point;
  LineString: LineString;
  Polygon: Polygon;
  MultiPoint: MultiPoint;
  MultiLineString: MultiLineString;
  MultiPolygon: MultiPolygon;
  GeometryCollection: GeometryCollection;
  Circle: Geometry; // OpenLayers 전용 타입
  LinearRing: Geometry; // OpenLayers 전용 타입
};

// export type ToOlGeometryType<T extends OlGeometry> = T extends { type: keyof OlGeometryTypeMap }
//   ? OlGeometryTypeMap[T['type']]
//   : OlGeometry;

/**
 * OpenLayers `Geometry`를 GeoJSON `Geometry`로 매핑하는 타입
 */
export type MapToGeoJSONGeometry<T extends OlGeometry> = T extends { getType(): infer R }
  ? R extends keyof OlGeometryTypeMap
    ? OlGeometryTypeMap[R]
    : Geometry
  : Geometry;
