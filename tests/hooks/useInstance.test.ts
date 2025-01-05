import { afterEach, describe, expect, it, vi } from 'vitest';
import { useInstance } from '../../src/hooks/useInstance';
import { renderHook } from '@testing-library/react';
import Disposable from 'ol/Disposable';

vi.mock('ol/Disposable', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      dispose: vi.fn(),
    })),
  };
});

// Mock Creator and Updater
const createFn = vi.fn(() => {
  return new Disposable();
});

const updateFn = vi.fn();

const initialProps = { key: 'value' };

describe('useInstance', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('처음 실행 시, 생성 함수는 1번만 호출되고, 수정 함수는 실행되지 않는다.', () => {
    const createPredicate = vi.fn();
    const updatePredicate = vi.fn();

    // 훅 실행
    const { result } = renderHook(() =>
      useInstance(initialProps, createFn, updateFn, createPredicate, updatePredicate),
    );

    expect(result.current).toBeDefined();

    // 생성 함수는 1번만 호출된다.
    expect(createFn).toHaveBeenCalledTimes(1);
    expect(createFn).toHaveBeenCalledWith(initialProps, undefined);

    // 수정 함수는 호출되지 않는다.
    expect(updateFn).not.toHaveBeenCalled();

    // createPredicate 함수는 호출되지 않는다.
    expect(createPredicate).not.toHaveBeenCalled();
    expect(updatePredicate).not.toHaveBeenCalled();
  });

  it('unmount시 dispose 실행', () => {
    const { unmount } = renderHook(() => useInstance(initialProps, createFn, updateFn, vi.fn(), vi.fn()));

    unmount();

    expect(Disposable).toHaveBeenCalled();
  });

  it('재생성시 dispose 실행', () => {
    const createPredicate = vi.fn().mockImplementation(() => true);

    // 훅 실행
    const { rerender } = renderHook(() => useInstance(initialProps, createFn, updateFn, createPredicate, vi.fn()));

    rerender({ key: 'newValue' });

    expect(Disposable).toHaveBeenCalled();
  });

  it('속성이 동일하면 경우, 생성/수정 함수를 실행하지 않는다.', () => {
    const createPredicate = vi.fn();
    const updatePredicate = vi.fn();

    const { rerender } = renderHook(
      (props) => useInstance(props, createFn, updateFn, createPredicate, updatePredicate),
      {
        initialProps,
      },
    );

    rerender({ key: 'value' });

    // 생성 함수는 1번만 호출된다.
    expect(createFn).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(updateFn).not.toHaveBeenCalled();

    // createPredicate 함수는 호출되지 않는다.
    expect(createPredicate).not.toHaveBeenCalled();
    expect(updatePredicate).not.toHaveBeenCalled();
  });

  it('true => 생성 함수만 실행', () => {
    const updatedProps = { key: 'newValue' };

    // true 반환 => 생성 함수 실행
    const createPredicate = vi.fn().mockImplementation(() => true);
    const updatePredicate = vi.fn();

    const { rerender } = renderHook(
      (props) => useInstance(props, createFn, updateFn, createPredicate, updatePredicate),
      {
        initialProps,
      },
    );

    rerender(updatedProps);

    // 생성 함수는 2번 호출된다.
    expect(createFn).toHaveBeenCalledTimes(2);
    expect(createFn).toHaveBeenCalledWith(updatedProps, initialProps);

    // 수정 함수는 호출되지 않는다.
    expect(updateFn).not.toHaveBeenCalled();

    // createPredicate 함수는 1번만 호출된다.
    expect(createPredicate).toHaveBeenCalledTimes(1);

    // updatePredicate 함수는 호출되지 않는다.
    expect(updatePredicate).toHaveBeenCalledTimes(0);
  });

  it('false, true => 수정 함수 실행', () => {
    const updatedProps = { key: 'newValue' };

    // true 반환 => 생성 함수 실행
    const createPredicate = vi.fn().mockImplementation(() => false);
    const updatePredicate = vi.fn().mockImplementation(() => true);

    const { rerender } = renderHook(
      (props) => useInstance(props, createFn, updateFn, createPredicate, updatePredicate),
      {
        initialProps,
      },
    );

    rerender(updatedProps);

    // 생성 함수는 1번 호출된다.
    expect(createFn).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(updateFn).toHaveBeenCalledTimes(1);

    // createPredicate 함수는 1번만 호출된다.
    expect(createPredicate).toHaveBeenCalledTimes(1);
    expect(updatePredicate).toHaveBeenCalledTimes(1);
  });

  it('false, false => 생성/수정 함수 실행을 하지 않는다', () => {
    const updatedProps = { key: 'newValue' };

    const createPredicate = vi.fn().mockImplementation(() => false);
    const updatePredicate = vi.fn().mockImplementation(() => false);

    const { rerender } = renderHook(
      (props) => useInstance(props, createFn, updateFn, createPredicate, updatePredicate),
      {
        initialProps,
      },
    );

    rerender(updatedProps);

    // 생성 함수는 1번 호출된다.
    expect(createFn).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(updateFn).toHaveBeenCalledTimes(0);

    // createPredicate 함수는 1번만 호출된다.
    expect(createPredicate).toHaveBeenCalledTimes(1);
    expect(updatePredicate).toHaveBeenCalledTimes(1);
  });
});
