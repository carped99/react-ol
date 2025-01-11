import { Constructor } from 'type-fest';

/**
 * 주어진 생성자 타입에 대한 타입 가드 함수를 생성합니다.
 *
 * @typeParam T - 검사할 타입
 * @param type - 검사할 타입의 생성자 함수
 *
 * @example
 * ```ts
 * class User {
 *   name: string;
 *   age: number;
 * }
 *
 * const isUser = byType(User);
 *
 * if (isUser(someValue)) {
 *   // someValue는 User 타입으로 타입 추론됨
 *   console.log(someValue.name);
 * }
 * ```
 */
export const byType = <T>(type: Constructor<T>) => {
  return (item: unknown): item is T => item instanceof type;
};
