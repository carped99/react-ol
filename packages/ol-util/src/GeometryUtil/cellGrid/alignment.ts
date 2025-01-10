/**
 * 그리드 정렬 방식을 정의하는 열거형
 */
export enum GridAlignment {
  CEILING = 'ceiling', // 올림 정렬
  FLOOR = 'floor', // 내림 정렬
  ROUND = 'round', // 반올림 정렬
  CENTER = 'center', // 중심점 정렬
  NEAREST = 'nearest', // 가장 가까운 경계 정렬
}

/**
 * 그리드 정렬 옵션 인터페이스
 */
export interface GridAlignmentOptions {
  alignment?: GridAlignment;
  offset?: number;
  snapToMin?: boolean;
}

/**
 * 그리드 시작점을 계산하는 함수
 *
 * @param min - 최소 좌표값
 * @param cellSize - 셀 크기
 * @param options - 정렬 옵션
 * @returns 계산된 그리드 시작점
 */
export const calculateGridStart = (min: number, cellSize: number, options: GridAlignmentOptions = {}): number => {
  const { alignment = GridAlignment.CEILING, offset = 0, snapToMin = true } = options;

  // 오프셋 적용
  const adjustedMin = min - offset;

  let result: number;
  switch (alignment) {
    case GridAlignment.FLOOR:
      result = Math.floor(adjustedMin / cellSize) * cellSize;
      break;

    case GridAlignment.ROUND:
      result = Math.round(adjustedMin / cellSize) * cellSize;
      break;

    case GridAlignment.CENTER:
      result = Math.floor(adjustedMin / cellSize) * cellSize + cellSize / 2;
      break;

    case GridAlignment.NEAREST:
      {
        const distance = adjustedMin % cellSize;
        result = distance < cellSize / 2 ? adjustedMin - distance : adjustedMin + (cellSize - distance);
      }
      break;

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
