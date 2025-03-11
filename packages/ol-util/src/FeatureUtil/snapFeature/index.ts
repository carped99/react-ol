import { Coordinate } from 'ol/coordinate.js';
import {
  buffer,
  clone,
  containsXY,
  createOrUpdateFromCoordinate,
  extend,
  Extent,
  getCenter,
  getHeight,
  getWidth,
} from 'ol/extent.js';
import Feature from 'ol/Feature.js';
import { fromExtent } from 'ol/geom/Polygon.js';
import { Geometry, LineString } from 'ol/geom.js';
import Map from 'ol/Map.js';
import { findExtent } from '../findExtent';

/**
 * 스냅 포인트
 */
interface SnapPoint {
  coordinate: Coordinate;
  type: 'center' | 'extent';
}

/**
 * 스냅 라인
 */
interface SnapLine {
  line: LineString;
  type: 'vertical' | 'horizontal';
  coordinate: number;
}

interface SnapMatch {
  delta: number;
  distance: number;
  guideLines: LineString[];
  coordinate: number;
}

/**
 * 스냅 결과
 */
export type SnapResult = {
  readonly snapped: boolean;
  readonly guidelines: readonly LineString[];
  readonly delta: Coordinate;
};

export interface SnapFeaturesOptions {
  map: Map;
  coordinate: Coordinate; // 현재 좌표
  features: Feature[]; // 현재 이동 중인 도형
  snapFeatures: Feature[]; // 스냅 대상 도형
  snapTolerance?: number; // 스냅 허용 범위 (픽셀 단위)
  guideLinePixel?: number; // 가이드라인 길이 (픽셀 단위)
}

export function snapFeatures({
  map,
  coordinate,
  features,
  snapFeatures,
  snapTolerance = 10,
  guideLinePixel = 30,
}: SnapFeaturesOptions) {
  if (features.length === 0 || snapFeatures.length === 0) {
    return {
      snapped: false,
      guidelines: [],
      delta: [0, 0],
    };
  }

  const geometry = fromExtent(findExtent(features)!);

  const snapResult = calculateSnap(map, coordinate, geometry, snapFeatures, snapTolerance, guideLinePixel);

  // 도형 위치 업데이트
  if (snapResult.snapped) {
    features.forEach((it) => {
      const geometry = it.getGeometry()!;
      geometry.translate(snapResult.delta[0], snapResult.delta[1]);
    });
  }

  return snapResult;
}

function calculateSnap(
  map: Map,
  coordinate: Coordinate,
  geometry: Geometry,
  snapCandidates: Feature[],
  snapTolerance: number,
  guideLinePixel: number,
): SnapResult {
  const extent = geometry.getExtent();
  const center = getCenter(extent);

  // 현재 좌표와 중심 좌표 간 차이 계산
  const deltaX = coordinate[0] - center[0];
  const deltaY = coordinate[1] - center[1];

  // 이동 후 예상 중심 및 경계 영역 계산
  // const targetCenter = [center[0] + deltaX, center[1] + deltaY];
  const targetExtent = [extent[0] + deltaX, extent[1] + deltaY, extent[2] + deltaX, extent[3] + deltaY];

  // 현재 이동 중인 도형의 스냅 포인트 생성
  const movingSnapPoints = createSnapPoints(targetExtent);

  // // 현재 이동 중인 도형의 연장선 생성
  // const movingExtensionLines = createSnapLines(targetExtent);

  let bestXSnap: SnapMatch | null = null;
  let bestYSnap: SnapMatch | null = null;

  // 스냅 허용 범위 (픽셀 단위)
  const pixelTolerance = snapTolerance * map.getView().getResolution()!;
  const guideLineLength = guideLinePixel * map.getView().getResolution()!;
  // 스냅 라인을 계산할 영역(스냅 허용 범위내에 있는 영역만 계산)
  // const extentTolerance = buffer(extent, pixelTolerance);

  for (const otherFeature of snapCandidates) {
    for (const point of movingSnapPoints) {
      const snapLines = createSnapLines(otherFeature, point, extent, pixelTolerance, guideLineLength);
      for (const snapLine of snapLines) {
        // 최단 지점 찾기
        const closestPoint = snapLine.line.getClosestPoint(point.coordinate);

        if (snapLine.type === 'vertical') {
          // 수직선인 경우
          const distance = getPixelDistance(map, closestPoint, [point.coordinate[0], closestPoint[1]]);

          if (distance >= snapTolerance) continue;

          const delta = closestPoint[0] - point.coordinate[0];
          if (!bestXSnap || distance < bestXSnap.distance) {
            bestXSnap = {
              delta,
              distance,
              coordinate: snapLine.coordinate,
              guideLines: [snapLine.line],
            };
          }
        } else if (snapLine.type === 'horizontal') {
          // 수평선인 경우
          const distance = getPixelDistance(map, closestPoint, [closestPoint[0], point.coordinate[1]]);

          if (distance >= snapTolerance) continue;

          if (!bestYSnap || distance < bestYSnap.distance) {
            const delta = closestPoint[1] - point.coordinate[1];
            bestYSnap = {
              delta,
              distance,
              coordinate: snapLine.coordinate,
              guideLines: [snapLine.line],
            };
          }
        }
      }

      // // 이동 중인 도형의 연장선에 대한 스냅
      // for (const extensionLine of movingExtensionLines) {
      //   console.log('Test Snap Line');
      //   for (const otherPoint of otherPoints) {
      //     const nearestPoint = extensionLine.line.getClosestPoint(otherPoint.coordinate);
      //     const distance = getPixelDistance(map, otherPoint.coordinate, nearestPoint);
      //
      //     if (distance < SNAP_TOLERANCE_PIXELS && (!bestSnap || distance < bestSnap.distance)) {
      //       const dx = otherPoint.coordinate[0] - nearestPoint[0];
      //       const dy = otherPoint.coordinate[1] - nearestPoint[1];
      //
      //       bestSnap = {
      //         position: [targetCenter[0] + dx, targetCenter[1] + dy],
      //         guidelines: [
      //           createGuideLine(extensionLine.line.getCoordinates()[0], extensionLine.line.getCoordinates()[1]),
      //         ],
      //         distance,
      //       };
      //
      //       console.log('Snap Extension Line');
      //     }
      //   }
      // }
    }
  }

  const guideLines: LineString[] = [];
  const delta = [deltaX, deltaY];
  if (bestXSnap) {
    delta[0] += bestXSnap.delta;
    guideLines.push(...bestXSnap.guideLines);
  }

  if (bestYSnap) {
    delta[1] += bestYSnap.delta;
    guideLines.push(...bestYSnap.guideLines);
  }

  return {
    snapped: !!(bestXSnap || bestYSnap),
    guidelines: guideLines,
    delta,
  };
}

function createSnapPoints(extent: Extent): SnapPoint[] {
  const center = getCenter(extent);
  return [
    { coordinate: center, type: 'center' }, // 중심점
    { coordinate: [extent[0], extent[1]], type: 'extent' }, // 좌하단
    { coordinate: [extent[2], extent[1]], type: 'extent' }, // 우하단
    { coordinate: [extent[0], extent[3]], type: 'extent' }, // 좌상단
    { coordinate: [extent[2], extent[3]], type: 'extent' }, // 우상단
  ];
}

/**
 * 주어진 영역에 대한 스냅 라인들을 생성합니다.
 *
 * @param feature - 스냅 대상
 * @param snapPoint - 스냅 가능 영역 (tolerance가 적용된 영역)
 * @param snapExtent
 * @param pixelTolerance
 * @param guideLineLength
 * @returns 생성된 스냅 라인 배열
 */
function createSnapLines(
  feature: Feature,
  snapPoint: SnapPoint,
  snapExtent: Extent,
  pixelTolerance: number,
  guideLineLength: number,
): SnapLine[] {
  const extent = feature.getGeometry()!.getExtent();
  const lines: SnapLine[] = [];
  const center = getCenter(extent);

  const snapPointExtent = buffer(createOrUpdateFromCoordinate(snapPoint.coordinate), pixelTolerance);

  // 가이드라인 길이 계산
  const totalExtent = extend(clone(snapExtent), extent);
  const totalCenter = getCenter(totalExtent);

  if (containsXY(snapPointExtent, center[0], snapPointExtent[1])) {
    // 중심점을 기준으로 수직/수평선
    lines.push({
      line: new LineString([
        [center[0], totalCenter[1] - getHeight(totalExtent) / 2 - guideLineLength],
        [center[0], totalCenter[1] + getHeight(totalExtent) / 2 + guideLineLength],
      ]),
      type: 'vertical',
      coordinate: center[0],
    });
  }

  if (containsXY(snapPointExtent, snapPointExtent[0], center[1])) {
    lines.push({
      line: new LineString([
        [totalCenter[0] - getWidth(totalExtent) / 2 - guideLineLength, center[1]],
        [totalCenter[0] + getWidth(totalExtent) / 2 + guideLineLength, center[1]],
      ]),
      type: 'horizontal',
      coordinate: center[1],
    });
  }

  if (containsXY(snapPointExtent, extent[0], snapPointExtent[1])) {
    lines.push({
      line: new LineString([
        [extent[0], totalExtent[1] - guideLineLength],
        [extent[0], totalExtent[3] + guideLineLength],
      ]),
      type: 'vertical',
      coordinate: extent[0],
    });
  }

  if (containsXY(snapPointExtent, extent[2], snapPointExtent[1])) {
    lines.push({
      line: new LineString([
        [extent[2], totalExtent[1] - guideLineLength],
        [extent[2], totalExtent[3] + guideLineLength],
      ]),
      type: 'vertical',
      coordinate: extent[2],
    });
  }

  if (containsXY(snapPointExtent, snapPointExtent[0], extent[1])) {
    lines.push({
      line: new LineString([
        [totalExtent[0] - guideLineLength, extent[1]],
        [totalExtent[2] + guideLineLength, extent[1]],
      ]),
      type: 'horizontal',
      coordinate: extent[1],
    });
  }

  if (containsXY(snapPointExtent, snapPointExtent[0], extent[3])) {
    lines.push({
      line: new LineString([
        [totalExtent[0] - guideLineLength, extent[3]],
        [totalExtent[2] + guideLineLength, extent[3]],
      ]),
      type: 'horizontal',
      coordinate: extent[3],
    });
  }

  return lines;
}

/**
 * 두 좌표 사이의 픽셀 거리 계산
 */
function getPixelDistance(map: Map, coordinate1: Coordinate, coordinate2: Coordinate) {
  const p1 = map.getPixelFromCoordinate(coordinate1);
  const p2 = map.getPixelFromCoordinate(coordinate2);
  return p1 != null && p2 != null ? Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) : Infinity;
}

// function nearlyEqual(a: number, b: number, epsilon = EPSILON): boolean {
//  const EPSILON = 1e-8;
//   return Math.abs(a - b) < epsilon;
// }
