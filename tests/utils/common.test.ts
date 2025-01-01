import { beforeEach, describe, expect, it } from 'vitest';
import { compare, compareDeep } from '../../src/utils/common';

describe('compare', () => {
  const comparator = vi.fn((a: unknown, b: unknown) => a === b);
  beforeEach(() => {
    comparator.mockClear();
  });

  it('두 값이 모두 NaN인 경우', () => {
    expect(compare(NaN, NaN, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('한 값만 NaN인 경우', () => {
    expect(compare(NaN, 1, comparator)).toBe(false);
    expect(compare(1, NaN, comparator)).toBe(false);
    expect(compare(null, NaN, comparator)).toBe(false);
    expect(compare(NaN, null, comparator)).toBe(false);
    expect(compare(undefined, NaN, comparator)).toBe(false);
    expect(compare(NaN, undefined, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('두 값이 모두 null인 경우', () => {
    expect(compare(null, null, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('한 값만 null인 경우', () => {
    expect(compare(null, 1, comparator)).toBe(false);
    expect(compare(1, null, comparator)).toBe(false);
    expect(compare(null, NaN, comparator)).toBe(false);
    expect(compare(NaN, null, comparator)).toBe(false);
    expect(compare(null, undefined, comparator)).toBe(false);
    expect(compare(undefined, null, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('두 값이 모두 undefined인 경우', () => {
    expect(compare(undefined, undefined, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('한 값만 undefined인 경우', () => {
    expect(compare(undefined, 1, comparator)).toBe(false);
    expect(compare(1, undefined, comparator)).toBe(false);
    expect(compare(undefined, NaN, comparator)).toBe(false);
    expect(compare(NaN, undefined, comparator)).toBe(false);
    expect(compare(undefined, null, comparator)).toBe(false);
    expect(compare(null, undefined, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('두 값이 모두 객체인 경우', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };

    expect(compare(obj1, obj2, comparator)).toBe(false); // 객체 참조가 다르므로 false

    // 비교 함수가 호출되었음을 확인
    expect(comparator).toHaveBeenCalledWith(obj1, obj2);
    expect(comparator).toHaveBeenCalledTimes(1);
  });

  it('두 값이 모두 Primitive 인 경우', () => {
    const obj1 = 1;
    const obj2 = 1;

    expect(compare(obj1, obj2, comparator)).toBe(true);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('그 이외의 비교의 경우', () => {
    const obj1 = { a: 1 } as unknown;
    const obj2 = 1 as unknown;

    expect(compare(obj1, obj2, comparator)).toBe(false);

    // 비교 함수가 호출되지 않았음을 확인
    expect(comparator).not.toHaveBeenCalled();
  });

  it('Deep Equals 경우', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };

    expect(compareDeep(obj1, obj2)).toBe(true);
  });
});
