import { act, renderHook, waitFor } from '@testing-library/react';
import { usePreviousByKey } from '@src/hooks/usePreviousByKey';

describe('usePreviousByKey', () => {
  it('초기값 반환', () => {
    const { result } = renderHook(() => usePreviousByKey({ a: 1, b: 2 }, ['a'], true));
    expect(result.current.prev).toBeUndefined();
    expect(result.current.curr).toEqual({ a: 1, b: 2 });
    expect(result.current.isEqual).toBeFalsy();
  });

  it('비교할 키가 없을 경우, 이전 값을 반환', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousByKey(value, [], true), {
      initialProps: { value: { a: 1, b: 2 } },
    });

    rerender({ value: { a: 2, b: 3 } });

    console.log('after rerender', result.current);
    expect(result.current.prev).toEqual({ a: 1, b: 2 });
    expect(result.current.curr).toEqual({ a: 2, b: 3 });
    expect(result.current).toBeTruthy();
  });

  it('비교할 키의 값이 변경된 경우 경우, 새로운 값을 반환', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousByKey(value, ['a'], true), {
      initialProps: { value: { a: 1, b: 2 } },
    });

    // `a` 값 변경
    act(() => {
      rerender({ value: { a: 3, b: 2 } });
    });

    console.log('after rerender', result.current);

    expect(result.current.prev).toEqual({ a: 1, b: 2 });
    expect(result.current.curr).toEqual({ a: 3, b: 2 });
    expect(result.current.isEqual).toBeFalsy();
  });

  it('비교할 키의 값이 동일한 경우 경우, 이전 값을 반환', () => {
    const { result, rerender } = renderHook(({ value }) => usePreviousByKey(value, ['a'], true), {
      initialProps: { value: { a: 1, b: 2 } },
    });

    // Change `b`, but `a` remains the same
    rerender({ value: { a: 1, b: 3 } });

    expect(result.current).toEqual({ a: 1, b: 2 }); // No change in `a`
  });

  it('제외할 키의 값이 변경될 경우, 이전 값을 반환', () => {
    // `a`를 제외한 다른 값으로 비교
    const { result, rerender } = renderHook(({ value }) => usePreviousByKey(value, ['a'], false), {
      initialProps: { value: { a: 1, b: 2 } },
    });

    // `a` 값 변경
    rerender({ value: { a: 2, b: 2 } });

    // `b` 값은 변경되지 않았고, `a` 값이 변경되었으므로 이전 값 반환
    expect(result.current).toEqual({ a: 1, b: 2 });
  });

  it('제외할 키 이외의 값이 변경될 경우, 새로운 값을 반환', () => {
    // `a`를 제외한 다른 값으로 비교
    const { result, rerender } = renderHook(({ value }) => usePreviousByKey(value, ['a'], false), {
      initialProps: { value: { a: 1, b: 2 } },
    });

    // `b` 값 변경
    rerender({ value: { a: 1, b: 3 } });

    // `b` 값이 변경되었으므로 새로운 값 반환
    expect(result.current).toEqual({ a: 1, b: 3 }); // Returns previous value
  });

  it('제외할 키가 없을 경우', () => {
    // `a`를 제외한 다른 값으로 비교
    const { result, rerender } = renderHook(({ value }) => usePreviousByKey(value, [], false), {
      initialProps: { value: { a: 1, b: 2 } },
    });

    rerender({ value: { a: 1, b: 2 } });

    expect(result.current).toEqual({ a: 1, b: 2 });

    rerender({ value: { a: 2, b: 2 } });

    expect(result.current).toEqual({ a: 2, b: 2 });

    rerender({ value: { a: 2, b: 3 } });

    expect(result.current).toEqual({ a: 2, b: 3 });
  });
});
