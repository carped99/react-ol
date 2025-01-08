import { afterEach, describe, expect, it, vi } from 'vitest';
import { useInstance } from '../../src/hooks/useInstance';
import { renderHook } from '@testing-library/react';

vi.mock('ol/Disposable', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      dispose: vi.fn(),
    })),
  };
});

const initialProps = { key: 'value' };

const provider = {
  createInstance: vi.fn().mockReturnValue({ key: 'value', created: true }),
  shouldCreateInstance: vi.fn(),
  updateInstance: vi.fn(),
  shouldUpdateInstance: vi.fn(),
};

describe('useInstance', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('처음 실행 시, 생성 함수는 1번만 호출되고, 수정 함수는 실행되지 않는다.', () => {
    // 훅 실행
    const { result } = renderHook(() => useInstance(provider, initialProps));
    expect(result.current).toBeDefined();

    // 생성 함수는 1번만 호출된다.
    expect(provider.createInstance).toHaveBeenCalledTimes(1);
    expect(provider.createInstance).toHaveBeenCalledWith(initialProps, initialProps);

    // 수정 함수는 호출되지 않는다.
    expect(provider.updateInstance).not.toHaveBeenCalled();

    // createPredicate 함수는 호출되지 않는다.
    expect(provider.shouldCreateInstance).not.toHaveBeenCalled();
    expect(provider.shouldUpdateInstance).not.toHaveBeenCalled();
  });

  it('속성이 동일하면 경우, 생성/수정 함수를 실행하지 않는다.', () => {
    const { rerender } = renderHook((props) => useInstance(provider, props), {
      initialProps,
    });

    rerender(initialProps);

    // 생성 함수는 1번만 호출된다.
    expect(provider.createInstance).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(provider.updateInstance).not.toHaveBeenCalled();

    // createPredicate 함수는 호출되지 않는다.
    expect(provider.shouldCreateInstance).not.toHaveBeenCalled();
    expect(provider.shouldUpdateInstance).not.toHaveBeenCalled();
  });

  it('true => 생성 함수만 실행', () => {
    const updatedProps = { key: 'newValue' };

    // true 반환 => 생성 함수 실행
    provider.shouldCreateInstance.mockReturnValue(true);

    const { rerender } = renderHook((props) => useInstance(provider, props), {
      initialProps,
    });

    rerender(updatedProps);

    // 생성 함수는 2번 호출된다.
    expect(provider.createInstance).toHaveBeenCalledTimes(2);
    expect(provider.createInstance).toHaveBeenCalledWith(updatedProps, initialProps);

    // 수정 함수는 호출되지 않는다.
    expect(provider.updateInstance).not.toHaveBeenCalled();

    // createPredicate 함수는 1번만 호출된다.
    expect(provider.shouldCreateInstance).toHaveBeenCalledTimes(1);

    // updatePredicate 함수는 호출되지 않는다.
    expect(provider.shouldUpdateInstance).toHaveBeenCalledTimes(0);
  });

  it('false, true => 수정 함수 실행', () => {
    // true 반환 => 생성 함수 실행
    provider.shouldCreateInstance.mockReturnValue(false);
    provider.shouldUpdateInstance.mockReturnValue(true);

    const { rerender } = renderHook((props) => useInstance(provider, props), {
      initialProps,
    });

    rerender({ key: 'newValue' });

    // 생성 함수는 1번 호출된다.
    expect(provider.createInstance).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(provider.createInstance).toHaveBeenCalledTimes(1);

    // createPredicate 함수는 1번만 호출된다.
    expect(provider.shouldCreateInstance).toHaveBeenCalledTimes(1);
    expect(provider.shouldUpdateInstance).toHaveBeenCalledTimes(1);
  });

  it('false, false => 생성/수정 함수 실행을 하지 않는다', () => {
    provider.shouldCreateInstance.mockReturnValue(false);
    provider.shouldUpdateInstance.mockReturnValue(false);

    const { rerender } = renderHook((props) => useInstance(provider, props), {
      initialProps,
    });

    rerender({ key: 'newValue' });

    // 생성 함수는 1번 호출된다.
    expect(provider.createInstance).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(provider.updateInstance).toHaveBeenCalledTimes(0);

    // createPredicate 함수는 1번만 호출된다.
    expect(provider.shouldCreateInstance).toHaveBeenCalledTimes(1);
    expect(provider.shouldUpdateInstance).toHaveBeenCalledTimes(1);
  });
});
