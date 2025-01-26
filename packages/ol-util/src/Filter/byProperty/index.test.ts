import Feature from 'ol/Feature.js';
import { Point } from 'ol/geom.js';
import { byName } from '../byName';

describe('byName', () => {
  // 테스트용 Feature 생성 헬퍼 함수
  const createFeature = (name: string) => {
    const feature = new Feature(new Point([0, 0]));
    feature.set('name', name);
    return feature;
  };

  describe('기본 동작 테스트', () => {
    it('단일 이름으로 필터링', () => {
      const feature = createFeature('test');
      const filter = byName('test');

      expect(filter(feature)).toBe(true);
    });

    it('일치하지 않는 이름', () => {
      const feature = createFeature('test');
      const filter = byName('other');

      expect(filter(feature)).toBe(false);
    });

    it('여러 이름 중 하나와 일치', () => {
      const feature = createFeature('test2');
      const filter = byName(['test1', 'test2', 'test3']);

      expect(filter(feature)).toBe(true);
    });
  });

  describe('다양한 입력 형식 테스트', () => {
    const feature = createFeature('test');

    it('문자열 배열', () => {
      const filter = byName(['test']);
      expect(filter(feature)).toBe(true);
    });

    it('여러 인자', () => {
      const filter = byName('other', 'test', 'another');
      expect(filter(feature)).toBe(true);
    });

    it('배열과 문자열 혼합', () => {
      const filter = byName(['other', 'test'], 'another');
      expect(filter(feature)).toBe(true);
    });

    it('readonly 배열', () => {
      const names = ['test', 'other'] as const;
      const filter = byName(names);
      expect(filter(feature)).toBe(true);
    });
  });

  describe('엣지 케이스 테스트', () => {
    it('빈 입력', () => {
      const feature = createFeature('test');
      const filter = byName();

      expect(filter(feature)).toBe(false);
    });

    it('빈 배열', () => {
      const feature = createFeature('test');
      const filter = byName([]);

      expect(filter(feature)).toBe(false);
    });

    it('name 속성이 없는 Feature', () => {
      const feature = new Feature(new Point([0, 0]));
      const filter = byName('test');

      expect(filter(feature)).toBe(false);
    });

    it('name 속성이 문자열이 아닌 경우', () => {
      const feature = new Feature(new Point([0, 0]));
      feature.set('name', 123);
      const filter = byName('123');

      expect(filter(feature)).toBe(false);
    });
  });
});
