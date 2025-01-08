import { beforeEach, describe, expect, it } from 'vitest';
import { equals, equalsDeep } from '../../src/utils/common';

describe('compare', () => {
  const comparator = vi.fn((a: unknown, b: unknown) => a === b);
  beforeEach(() => {
    comparator.mockClear();
  });

  it('두 값이 모두 NaN인 경우', () => {
    expect(equals(NaN, NaN, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('한 값만 NaN인 경우', () => {
    expect(equals(NaN, 1, comparator)).toBe(false);
    expect(equals(1, NaN, comparator)).toBe(false);
    expect(equals(null, NaN, comparator)).toBe(false);
    expect(equals(NaN, null, comparator)).toBe(false);
    expect(equals(undefined, NaN, comparator)).toBe(false);
    expect(equals(NaN, undefined, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('두 값이 모두 null인 경우', () => {
    expect(equals(null, null, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('한 값만 null인 경우', () => {
    expect(equals(null, 1, comparator)).toBe(false);
    expect(equals(1, null, comparator)).toBe(false);
    expect(equals(null, undefined, comparator)).toBe(false);
    expect(equals(undefined, null, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('두 값이 모두 undefined인 경우', () => {
    expect(equals(undefined, undefined, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('한 값만 undefined인 경우', () => {
    expect(equals(undefined, 1, comparator)).toBe(false);
    expect(equals(1, undefined, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('두 값이 모두 객체인 경우', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };

    expect(equals(obj1, obj2, comparator)).toBe(false); // 객체 참조가 다르므로 false

    // 비교 함수가 호출되었음을 확인
    expect(comparator).toHaveBeenCalledWith(obj1, obj2);
    expect(comparator).toHaveBeenCalledTimes(1);
  });

  it('두 값이 모두 Primitive 인 경우', () => {
    const obj1 = 1;
    const obj2 = 1;

    expect(equals(obj1, obj2, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('그 이외의 비교의 경우', () => {
    const obj1 = { a: 1 } as unknown;
    const obj2 = 1 as unknown;

    expect(equals(obj1, obj2, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('Deep Equals 경우', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };

    expect(equalsDeep(obj1, obj2)).toBe(true);
  });
});
