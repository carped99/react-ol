import type {
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
import {
  GeometryCollection as OlGeometryCollection,
  LineString as OlLineString,
  MultiLineString as OlMultiLineString,
  MultiPoint as OlMultiPoint,
  MultiPolygon as OlMultiPolygon,
  Point as OlPoint,
  Polygon as OlPolygon,
} from 'ol/geom.js';
import { describe, expect, it } from 'vitest';
import { readGeometry } from './index';

describe('readGeometry', () => {
  // 테스트 데이터 사전 정의
  const testData = {
    point: {
      type: 'Point',
      coordinates: [126.978, 37.566],
    } as Point,

    lineString: {
      type: 'LineString',
      coordinates: [
        [126.978, 37.566],
        [126.989, 37.577],
      ],
    } as LineString,

    polygon: {
      type: 'Polygon',
      coordinates: [
        [
          [126.978, 37.566],
          [126.989, 37.577],
          [126.967, 37.577],
          [126.978, 37.566],
        ],
      ],
    } as Polygon,

    multiPoint: {
      type: 'MultiPoint',
      coordinates: [
        [126.978, 37.566],
        [126.989, 37.577],
      ],
    } as MultiPoint,

    multiLineString: {
      type: 'MultiLineString',
      coordinates: [
        [
          [126.978, 37.566],
          [126.989, 37.577],
        ],
        [
          [126.967, 37.577],
          [126.978, 37.566],
        ],
      ],
    } as MultiLineString,

    multiPolygon: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [126.978, 37.566],
            [126.989, 37.577],
            [126.967, 37.577],
            [126.978, 37.566],
          ],
        ],
        [
          [
            [126.988, 37.566],
            [126.999, 37.577],
            [126.977, 37.577],
            [126.988, 37.566],
          ],
        ],
      ],
    } as MultiPolygon,

    geometryCollection: {
      type: 'GeometryCollection',
      geometries: [
        {
          type: 'Point',
          coordinates: [126.978, 37.566],
        },
        {
          type: 'LineString',
          coordinates: [
            [126.978, 37.566],
            [126.989, 37.577],
          ],
        },
      ],
    } as GeometryCollection,
  };

  describe('타입별 변환 테스트', () => {
    it('Point를 OlPoint로 변환', () => {
      const result = readGeometry(testData.point);
      expect(result).toBeInstanceOf(OlPoint);
      expect(result.getCoordinates()).toEqual(testData.point.coordinates);
    });

    it('LineString을 OlLineString으로 변환', () => {
      const result = readGeometry(testData.lineString);
      expect(result).toBeInstanceOf(OlLineString);
      expect(result.getCoordinates()).toEqual(testData.lineString.coordinates);
    });

    it('Polygon을 OlPolygon으로 변환', () => {
      const result = readGeometry(testData.polygon);
      expect(result).toBeInstanceOf(OlPolygon);
      expect(result.getCoordinates()).toEqual(testData.polygon.coordinates);
    });

    it('MultiPoint를 OlMultiPoint로 변환', () => {
      const result = readGeometry(testData.multiPoint);
      expect(result).toBeInstanceOf(OlMultiPoint);
      expect(result.getCoordinates()).toEqual(testData.multiPoint.coordinates);
    });

    it('MultiLineString을 OlMultiLineString으로 변환', () => {
      const result = readGeometry(testData.multiLineString);
      expect(result).toBeInstanceOf(OlMultiLineString);
      expect(result.getCoordinates()).toEqual(testData.multiLineString.coordinates);
    });

    it('MultiPolygon을 OlMultiPolygon으로 변환', () => {
      const result = readGeometry(testData.multiPolygon);
      expect(result).toBeInstanceOf(OlMultiPolygon);
      expect(result.getCoordinates()).toEqual(testData.multiPolygon.coordinates);
    });

    it('GeometryCollection을 OlGeometryCollection으로 변환', () => {
      const result = readGeometry(testData.geometryCollection);
      expect(result).toBeInstanceOf(OlGeometryCollection);
      const geometries = (result as OlGeometryCollection).getGeometries();
      expect(geometries[0]).toBeInstanceOf(OlPoint);
      expect(geometries[1]).toBeInstanceOf(OlLineString);
    });
  });

  describe('에러 케이스 테스트', () => {
    it('잘못된 geometry 타입에 대한 에러 처리', () => {
      const invalidGeometry = {
        type: 'InvalidType',
        coordinates: [0, 0],
      };
      expect(() => readGeometry(invalidGeometry as any)).toThrow();
    });

    it('누락된 coordinates에 대한 에러 처리', () => {
      const invalidGeometry = {
        type: 'Point',
      };
      expect(() => readGeometry(invalidGeometry as any)).toThrow();
    });
  });

  describe('옵션 테스트', () => {
    it('dataProjection 옵션 적용', () => {
      const result = readGeometry(testData.point, {
        options: { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' },
      });
      expect(result).toBeInstanceOf(OlPoint);
      // 좌표 변환이 적용되었는지 확인
      const coords = result.getCoordinates();
      expect(coords).not.toEqual(testData.point.coordinates);
    });
  });
});
