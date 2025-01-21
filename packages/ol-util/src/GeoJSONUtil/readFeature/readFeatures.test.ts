import { Feature as OlFeature } from 'ol';
import { LineString as OlLineString, Point as OlPoint } from 'ol/geom';
import { Feature, FeatureCollection, LineString, Point } from 'geojson';
import { readFeatures } from '.';

describe('readFeatures', () => {
  // Point Feature 테스트
  it('should convert GeoJSON Point Feature to OlFeature<OlPoint>', () => {
    // Given
    const pointFeature: Feature<Point> = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10, 20],
      },
      properties: {
        name: 'test point',
      },
    };

    // When
    const result = readFeatures(pointFeature);

    // Then
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(OlFeature);
    expect(result[0].getGeometry()).toBeInstanceOf(OlPoint);
    expect(result[0].getGeometry()?.getCoordinates()).toEqual([10, 20]);
    expect(result[0].get('name')).toBe('test point');
  });

  // Point FeatureCollection 테스트
  it('should convert GeoJSON Point FeatureCollection to OlFeature<OlPoint>[]', () => {
    // Given
    const pointCollection: FeatureCollection<Point> = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [10, 20],
          },
          properties: { name: 'point 1' },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [30, 40],
          },
          properties: { name: 'point 2' },
        },
      ],
    };

    // When
    const result = readFeatures(pointCollection);

    // Then
    expect(result).toHaveLength(2);
    expect(result[0].getGeometry()).toBeInstanceOf(OlPoint);
    expect(result[0].getGeometry()?.getCoordinates()).toEqual([10, 20]);
    expect(result[0].get('name')).toBe('point 1');
    expect(result[1].getGeometry()?.getCoordinates()).toEqual([30, 40]);
    expect(result[1].get('name')).toBe('point 2');
  });

  // LineString Feature 테스트
  it('should convert GeoJSON LineString Feature to OlFeature<OlLineString>', () => {
    // Given
    const lineFeature: Feature<LineString> = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [10, 20],
          [30, 40],
        ],
      },
      properties: {
        name: 'test line',
      },
    };

    // When
    const result = readFeatures(lineFeature);

    // Then
    expect(result).toHaveLength(1);
    expect(result[0].getGeometry()).toBeInstanceOf(OlLineString);
    expect(result[0].getGeometry()?.getCoordinates()).toEqual([
      [10, 20],
      [30, 40],
    ]);
    expect(result[0].get('name')).toBe('test line');
  });

  // 문자열 입력 테스트
  it('should handle GeoJSON string input', () => {
    // Given
    const geoJSONString = JSON.stringify({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10, 20],
      },
      properties: {
        name: 'test point',
      },
    });

    // When
    const result = readFeatures<Point>(geoJSONString);

    // Then
    expect(result).toHaveLength(1);
    expect(result[0].getGeometry()).toBeInstanceOf(OlPoint);
    expect(result[0].getGeometry()?.getCoordinates()).toEqual([10, 20]);
  });

  // 커스텀 프로퍼티 테스트
  it('should handle custom properties', () => {
    // Given
    interface CustomProperties {
      name: string;
      value: number;
      isActive: boolean;
    }

    const feature: Feature<Point, CustomProperties> = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10, 20],
      },
      properties: {
        name: 'test',
        value: 42,
        isActive: true,
      },
    };

    // When
    const result = readFeatures(feature);

    // Then
    expect(result[0].get('name')).toBe('test');
    expect(result[0].get('value')).toBe(42);
    expect(result[0].get('isActive')).toBe(true);
  });

  // 에러 케이스 테스트
  it('should handle invalid input gracefully', () => {
    // Given
    const invalidInput = 'not a valid GeoJSON';

    // When & Then
    expect(() => readFeatures(invalidInput)).toThrow();
  });

  // 옵션 테스트
  it('should respect GeoJSON format options', () => {
    // Given
    const feature: Feature<Point> = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [10, 20],
      },
      properties: {
        name: 'test point',
      },
    };

    const options = {
      format: {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      },
    };

    // When
    const result = readFeatures(feature, options);

    // Then
    // 좌표가 변환되었는지 확인
    const coordinates = result[0].getGeometry()?.getCoordinates();
    expect(coordinates).not.toEqual([10, 20]); // 좌표가 변환되었으므로 다른 값이어야 함
  });
});
