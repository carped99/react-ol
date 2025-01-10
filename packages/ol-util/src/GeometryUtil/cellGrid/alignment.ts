import { GridAlignment, GridAlignmentOptions } from './index';

/**
 * 그리드 시작점을 계산하는 함수
 *
 * @param min - 최소 좌표값
 * @param cellSize - 셀 크기
 * @param options - 정렬 옵션
 * @returns 계산된 그리드 시작점
 *
 * @example
 * ```ts
 * // 기본 사용 (CEILING 정렬)
 * calculateGridStart(3.2, 2) // returns 2 (snapToMin이 true이므로)
 *
 * // FLOOR 정렬
 * calculateGridStart(3.2, 2, { alignment: GridAlignment.FLOOR }) // returns 2
 *
 * // CENTER 정렬
 * calculateGridStart(3.2, 2, { alignment: GridAlignment.CENTER }) // returns 3
 *
 * // 오프셋 사용
 * calculateGridStart(3.2, 2, { offset: 0.5 }) // returns 2.5
 * ```
 */
export const calculateGridStart = (min: number, cellSize: number, options: GridAlignmentOptions = {}): number => {
  const { alignment = GridAlignment.CEILING, offset = 0, snapToMin = true } = options;

  // 오프셋 적용
  const adjustedMin = min - offset;

  let result: number;
  switch (alignment) {
    // 내림: 가장 가까운 작은 셀 경계로 정렬
    case GridAlignment.FLOOR:
      result = Math.floor(adjustedMin / cellSize) * cellSize;
      break;

    // 반올림: 가장 가까운 셀 경계로 정렬
    case GridAlignment.ROUND:
      result = Math.round(adjustedMin / cellSize) * cellSize;
      break;

    // 중심점: 셀의 중앙에 정렬
    case GridAlignment.CENTER:
      result = Math.floor(adjustedMin / cellSize) * cellSize + cellSize / 2;
      break;

    // 최근접: 가장 가까운 셀 경계로 정렬
    case GridAlignment.NEAREST:
      {
        const distance = adjustedMin % cellSize;
        result = distance < cellSize / 2 ? adjustedMin - distance : adjustedMin + (cellSize - distance);
      }
      break;

    // 올림: 가장 가까운 큰 셀 경계로 정렬
    case GridAlignment.CEILING:
    default:
      result = Math.ceil(adjustedMin / cellSize) * cellSize;
      break;
  }

  // snapToMin이 true이고 시작점이 min보다 크면 한 셀 앞으로 이동
  if (snapToMin && result > min) {
    result -= cellSize;
  }

  // 오프셋 복원
  return result + offset;
};
