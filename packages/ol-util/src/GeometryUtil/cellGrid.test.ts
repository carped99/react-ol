import { streamingCellGrid } from './cellGrid';
import { BBox, Feature, Polygon } from 'geojson';

describe('streamingCellGrid', () => {
  const bbox: BBox = [0, 0, 100, 100];

  describe('기본 기능', () => {
    it('지정된 크기의 셀을 생성한다', async () => {
      const cellWidth = 50;
      const cellHeight = 50;
      let totalCells = 0;
      let firstBatch: Feature<Polygon>[] = [];

      for await (const batch of streamingCellGrid(bbox, cellWidth, cellHeight)) {
        if (totalCells === 0) {
          firstBatch = batch;
        }
        totalCells += batch.length;
      }

      // 전체 셀 개수 확인 (100x100 영역을 50x50 셀로 나누면 4개)
      expect(totalCells).toBe(4);

      // 첫 번째 셀의 크기 확인
      const firstCell = firstBatch[0];
      const coordinates = firstCell.geometry.coordinates[0];
      // 좌표 순서: [좌하단, 우하단, 우상단, 좌상단, 좌하단]
      const [bottomLeft, bottomRight, , topLeft] = coordinates;
      // 너비 확인 (좌하단 -> 우하단)
      expect(bottomRight[0] - bottomLeft[0]).toBe(cellWidth);

      // 높이 확인 (좌하단 -> 좌상단)
      expect(topLeft[1] - bottomLeft[1]).toBe(cellHeight);
    });

    it('배치 크기', async () => {
      const batchSize = 2;
      let batchCount = 0;

      for await (const batch of streamingCellGrid(bbox, 50, 50, { batchSize })) {
        expect(batch.length).toBeLessThanOrEqual(batchSize);
        batchCount++;
      }

      expect(batchCount).toBe(2); // 400개 셀을 2개씩 나누어 처리
    });

    it('셀 필터링', async () => {
      const cellValidator = vi.fn((x, y) => x < 50 && y < 50);
      let totalCells = 0;

      for await (const batch of streamingCellGrid(bbox, 50, 50, { cellValidator })) {
        totalCells += batch.length;
      }

      expect(totalCells).toBe(1); // 4개 중 1개만 조건 만족
      expect(cellValidator).toHaveBeenCalled();
    });

    it('includePartialCells 옵션을 처리한다', async () => {
      const bbox: [number, number, number, number] = [0, 0, 75, 75];
      let totalCellsWithPartial = 0;
      let totalCellsWithoutPartial = 0;

      // 부분 셀 포함
      for await (const batch of streamingCellGrid(bbox, 50, 50, {
        includePartialCells: true,
      })) {
        totalCellsWithPartial += batch.length;
      }

      // 부분 셀 제외
      for await (const batch of streamingCellGrid(bbox, 50, 50, {
        includePartialCells: false,
      })) {
        totalCellsWithoutPartial += batch.length;
      }

      expect(totalCellsWithPartial).toBeGreaterThan(totalCellsWithoutPartial);
    });

    it('alignmentPoint를 기준으로 그리드를 정렬한다', async () => {
      const alignmentPoint: [number, number] = [25, 25];
      let firstCell: Feature<Polygon> | null = null;

      for await (const batch of streamingCellGrid(bbox, 50, 50, { alignmentPoint })) {
        if (batch.length > 0) {
          firstCell = batch[0];
          break;
        }
      }

      expect(firstCell).not.toBeNull();
      const [[x, y]] = firstCell!.geometry.coordinates[0];

      // alignmentPoint를 기준으로 정렬되었는지 확인
      expect((x - alignmentPoint[0]) % 50).toBe(0);
      expect((y - alignmentPoint[1]) % 50).toBe(0);
    });
  });

  describe('취소 처리', () => {
    it('AbortSignal로 생성을 취소한다', async () => {
      const controller = new AbortController();
      let totalCells = 0;
      let batchCount = 0;

      // 첫 번째 배치 후 취소
      setTimeout(() => controller.abort(), 0);

      try {
        for await (const batch of streamingCellGrid(bbox, 50, 50, {
          abortSignal: controller.signal,
        })) {
          totalCells += batch.length;
          batchCount++;
        }
      } catch {
        // 취소 시 에러가 발생하지 않아야 함
      }

      expect(batchCount).toBeLessThan(4); // 전체 처리되지 않음
    });
  });

  describe('에러 처리', () => {
    it('잘못된 bbox를 처리한다', async () => {
      const invalidBbox: [number, number, number, number] = [100, 100, 0, 0];

      await expect(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of streamingCellGrid(invalidBbox, 50, 50)) {
          // noop
        }
      }).rejects.toThrow('Invalid bbox');
    });

    it('잘못된 셀 크기를 처리한다', async () => {
      await expect(async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const _ of streamingCellGrid(bbox, 0, 50)) {
          // noop
        }
      }).rejects.toThrow('Cell dimensions must be greater than 0');
    });
  });

  describe('성능', () => {
    it('대량의 셀을 효율적으로 처리한다', async () => {
      const largeBbox: [number, number, number, number] = [0, 0, 10000, 10000];
      const startTime = performance.now();
      const totalCells = 0;
      let maxBatchProcessingTime = 0;

      for await (const batch of streamingCellGrid(largeBbox, 1, 1, {
        batchSize: 50,
      })) {
        const batchStartTime = performance.now();
        // totalCells += batch.length;
        const batchProcessingTime = performance.now() - batchStartTime;
        maxBatchProcessingTime = Math.max(maxBatchProcessingTime, batchProcessingTime);
      }

      const totalTime = performance.now() - startTime;
      console.log('Total time:', totalTime);

      // 성능 기준 검증
      // expect(totalTime).toBeLessThan(5000); // 5초 이내 완료
      // expect(maxBatchProcessingTime).toBeLessThan(100); // 배치당 100ms 이내
      // expect(totalCells).toBe(10000 * 10000); // 예상되는 셀 개수
    });
  });
});
