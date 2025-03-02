import type {
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
import type {
  Geometry as OlGeometry,
  GeometryCollection as OlGeometryCollection,
  LineString as OlLineString,
  MultiLineString as OlMultiLineString,
  MultiPoint as OlMultiPoint,
  MultiPolygon as OlMultiPolygon,
  Point as OlPoint,
  Polygon as OlPolygon,
} from 'ol/geom.js';

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
export type ToOlGeometry<T extends Geometry> = T extends { type: keyof GeometryTypeMap }
  ? GeometryTypeMap[T['type']]
  : OlGeometry;

/**
 * OpenLayers `Geometry`를 GeoJSON `Geometry`로 매핑하는 타입
 */
export type ToGeoJSONGeometry<T extends OlGeometry> = T extends OlPoint
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
