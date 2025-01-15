// /**
//  * 텍스트 스타일의 기본 옵션
//  */
// const DEFAULT_TEXT_OPTIONS: Options = {
//   font: '14px sans-serif',
//   textAlign: 'center',
//   textBaseline: 'middle',
//   fill: new Fill({
//     color: 'white',
//   }),
//   stroke: new Stroke({
//     color: 'black',
//     width: 3,
//   }),
//   offsetX: 0,
//   offsetY: 0,
//   padding: [5, 5, 5, 5],
//   overflow: true,
// };
//
// /**
//  * 지정된 시간 동안 피처에 임시 스타일을 적용합니다.
//  * @param map - OpenLayers 맵 인스턴스
//  * @param layer - 대상 벡터 레이어
//  * @param position
//  * @param text
//  * @param duration - 스타일 적용 지속 시간 (밀리초)
//  * @param options
//  * @returns 애니메이션을 정리하는 함수
//  */
// export function drawTemporalText(
//   map: Map,
//   layer: DrawTemporalFeatureLayer,
//   position: Coordinate,
//   duration: number,
//   options?: Options,
// ): () => void {
//   const fadeOutStart = 1000;
//
//   const textStyle = createFadingTextStyle(options);
//
//   const styleFunction: DrawTemporalFeatureStyle = (_, { elapsed }) => {
//     let opacity = 1;
//     if (elapsed > fadeOutStart) {
//       opacity = Math.max((duration - elapsed) / (duration - fadeOutStart), 0);
//     }
//
//     return new Style({
//       text: textStyle(opacity),
//     });
//   };
//
//   const feature = new Feature({
//     geometry: new Point(position),
//   });
//
//   return drawTemporalFeature(map, layer, [feature], styleFunction, duration);
// }
//
// /**
//  * 투명도만 변경되는 텍스트 스타일을 생성합니다.
//  *
//  * @param options - 기본 Text 옵션
//  * @returns 투명도를 적용할 수 있는 스타일 생성 함수
//  */
// export const createFadingTextStyle = (options?: Options) => {
//   // 기본 Text 인스턴스 생성
//   const style = new Text(options);
//
//   // Fill, Stroke 참조 저장
//   const fill = style.getFill();
//   const stroke = style.getStroke();
//
//   // 기본 색상 저장
//   const fillColor = fill?.getColor();
//   const strokeColor = stroke?.getColor();
//
//   return (opacity: number) => {
//     // opacity 적용
//     if (fill && fillColor) {
//       if (Array.isArray(fillColor)) {
//         // RGBA 배열인 경우
//         fill.setColor([...fillColor.slice(0, 3), fillColor[3] * opacity]);
//       } else if (typeof fillColor === 'string') {
//         // CSS 색상 문자열인 경우
//         const rgba = fillColor.match(/[\d.]+/g);
//         if (rgba && rgba.length >= 3) {
//           const alpha = rgba.length === 4 ? Number(rgba[3]) * opacity : opacity;
//           fill.setColor(`rgba(${rgba[0]},${rgba[1]},${rgba[2]},${alpha})`);
//         }
//       }
//     }
//
//     if (stroke && strokeColor) {
//       if (Array.isArray(strokeColor)) {
//         // RGBA 배열인 경우
//         stroke.setColor([...strokeColor.slice(0, 3), strokeColor[3] * opacity]);
//       } else if (typeof strokeColor === 'string') {
//         // CSS 색상 문자열인 경우
//         const rgba = strokeColor.match(/[\d.]+/g);
//         if (rgba && rgba.length >= 3) {
//           const alpha = rgba.length === 4 ? Number(rgba[3]) * opacity : opacity;
//           stroke.setColor(`rgba(${rgba[0]},${rgba[1]},${rgba[2]},${alpha})`);
//         }
//       }
//     }
//     return style;
//   };
// };
