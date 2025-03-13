import { Coordinate } from 'ol/coordinate.js';
import { createEmpty, extend, Extent, getCenter } from 'ol/extent.js';

export type AlignmentType =
  | 'left'
  | 'top'
  | 'right'
  | 'bottom'
  | 'center'
  | 'middle'
  | 'justify-horizontal'
  | 'justify-vertical';

export const alignByExtent = <T>(
  items: T[],
  alignment: AlignmentType,
  mapper: (item: T) => Extent,
): {
  data: T;
  offset: Coordinate;
}[] => {
  if (alignment === 'justify-horizontal') {
    return justifyHorizontal(items, mapper);
  } else if (alignment === 'justify-vertical') {
    return justifyVertical(items, mapper);
  }

  const calculatedItems = items.map((data) => {
    const bbox = mapper(data);
    return { data, bbox };
  });

  const extent = createEmpty();
  calculatedItems.forEach((it) => {
    extend(extent, it.bbox);
  });

  const [centerX, centerY] = getCenter(extent);

  switch (alignment) {
    case 'center': {
      return calculatedItems.map((it) => {
        const center = getCenter(it.bbox);
        return { data: it.data, offset: [centerX - center[0], 0] };
      });
    }
    case 'middle': {
      return calculatedItems.map((it) => {
        const center = getCenter(it.bbox);
        return { data: it.data, offset: [0, centerY - center[1]] };
      });
    }
    case 'left': {
      return calculatedItems.map((it) => {
        return { data: it.data, offset: [extent[0] - it.bbox[0], 0] };
      });
    }
    case 'top': {
      return calculatedItems.map((it) => {
        return { data: it.data, offset: [0, extent[3] - it.bbox[3]] };
      });
    }
    case 'right': {
      return calculatedItems.map((it) => {
        return { data: it.data, offset: [extent[2] - it.bbox[2], 0] };
      });
    }
    case 'bottom': {
      return calculatedItems.map((it) => {
        return { data: it.data, offset: [0, extent[1] - it.bbox[1]] };
      });
    }
  }
};

const justifyHorizontal = <T>(
  items: T[],
  mapper: (item: T) => Extent,
): {
  data: T;
  offset: Coordinate;
}[] => {
  // 2개 이하의 요소는 정렬할 필요가 없다.
  if (items.length <= 2) return items.map((data) => ({ data, offset: [0, 0] }));

  const sortedItems = items.map((data) => ({ data, bbox: mapper(data) })).sort((a, b) => a.bbox[0] - b.bbox[0]);

  const firstItemBBox = sortedItems[0].bbox;
  const lastItemBBox = sortedItems[sortedItems.length - 1].bbox;

  // 첫번째 요소의 오른쪽 끝
  const startPoint = firstItemBBox[2];

  // 마지막 요소의 왼쪽 끝
  const endPoint = lastItemBBox[0];

  // 첫번째와 마지막 요소 사이의 공간
  const totalSpace = endPoint - startPoint;

  // 중간 요소들
  const middleItems = sortedItems.slice(1, -1);
  const totalMiddleWidth = middleItems.reduce((sum, item) => sum + (item.bbox[2] - item.bbox[0]), 0);

  // 간격
  const spacing = (totalSpace - totalMiddleWidth) / (items.length - 1);

  let currentX = startPoint + spacing;
  return [
    { data: sortedItems[0].data, offset: [0, 0] }, // 첫번째 요소는 그대로 둔다.
    ...middleItems.map((item) => {
      const offset = [currentX - item.bbox[0], 0];
      currentX += item.bbox[2] - item.bbox[0] + spacing;
      return { data: item.data, offset };
    }),
    { data: sortedItems[sortedItems.length - 1].data, offset: [0, 0] }, // 마지막 요소는 그대로 둔다.
  ];
};

const justifyVertical = <T>(
  items: T[],
  mapper: (item: T) => Extent,
): {
  data: T;
  offset: Coordinate;
}[] => {
  if (items.length <= 2) return items.map((data) => ({ data, offset: [0, 0] }));

  // Y축 기준으로 minY(아래쪽) 기준 오름차순 정렬
  const sortedItems = items.map((data) => ({ data, bbox: mapper(data) })).sort((a, b) => a.bbox[1] - b.bbox[1]);

  const firstItem = sortedItems[0]; // 최상단 요소 (minY가 가장 작은 요소)
  const lastItem = sortedItems[sortedItems.length - 1]; // 최하단 요소 (minY가 가장 큰 요소)

  const startY = firstItem.bbox[3]; // 최상단 요소의 maxY (위쪽 끝)
  const endY = lastItem.bbox[1]; // 최하단 요소의 minY (아래쪽 끝)
  const totalSpace = endY - startY;

  const middleItems = sortedItems.slice(1, -1);
  const totalMiddleHeight = middleItems.reduce((sum, item) => sum + (item.bbox[3] - item.bbox[1]), 0);

  const spacing = (totalSpace - totalMiddleHeight) / (middleItems.length + 1);

  let currentY = startY + spacing;

  return [
    { data: firstItem.data, offset: [0, 0] }, // 첫 번째 요소 고정
    ...middleItems.map(({ data, bbox }) => {
      const offset = [0, currentY - bbox[1]]; // minY 기준으로 위치 조정
      currentY += bbox[3] - bbox[1] + spacing;
      return { data, offset };
    }),
    { data: lastItem.data, offset: [0, 0] }, // 마지막 요소 고정
  ];
};
