/**
 * 객체를 생성하는 함수
 *
 * @typeParam T - 생성할 객체의 타입
 * @typeParam P - 생성에 필요한 속성의 타입
 *
 * @param currProps - 현재 속성. 속성이 `undefined`일 수 있습니다.
 * @param prevProps - 이전 속성.
 *
 * @returns T - 생성된 객체
 */
export type InstanceCreator<T, P> = (currProps: P, prevProps?: P) => T;

/**
 * 객체의 상태를 수정하는 함수
 *
 * @typeParam T - 수정할 객체의 타입
 * @typeParam P - 수정에 필요한 속성의 타입
 *
 * @param instance - 객체 인스턴스
 * @param currProps - 갱신에 필요한 현재 속성들. 속성이 `undefined`일 수 있습니다.
 * @param prevProps - (선택적) 이전 속성들. 상태 갱신 시 비교하거나 이전 상태를 참고할 때 사용됩니다.
 *
 * @returns void - 이 함수는 상태를 직접 수정하며, 반환 값은 없습니다.
 */
export type InstanceUpdater<T, P> = (instance: T, currProps?: P, prevProps?: P) => void;

/**
 * 객체를 생성하거나 수정할지 결정하는 함수의 형태를 정의합니다.
 *
 * @typeParam P - 객체에 필요한 속성들의 타입
 *
 * @param currProps - 현재 속성들
 * @param prevProps - 이전 속성들
 */
export type InstancePredicate<P> = (currProps?: P, prevProps?: P) => boolean;

export interface InstanceProvider<T, P> {
  create: InstanceCreator<T, P>;

  canCreate: InstancePredicate<P>;

  update: InstanceUpdater<T, P>;

  canUpdate: InstancePredicate<P>;
}
