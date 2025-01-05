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
  create: vi.fn().mockReturnValue({ key: 'value', created: true }),
  canCreate: vi.fn(),
  update: vi.fn(),
  canUpdate: vi.fn(),
};

describe('useInstance', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('처음 실행 시, 생성 함수는 1번만 호출되고, 수정 함수는 실행되지 않는다.', () => {
    // 훅 실행
    const { result } = renderHook(() => useInstance(initialProps, provider));
    expect(result.current).toBeDefined();

    // 생성 함수는 1번만 호출된다.
    expect(provider.create).toHaveBeenCalledTimes(1);
    expect(provider.create).toHaveBeenCalledWith(initialProps, undefined);

    // 수정 함수는 호출되지 않는다.
    expect(provider.update).not.toHaveBeenCalled();

    // createPredicate 함수는 호출되지 않는다.
    expect(provider.canCreate).not.toHaveBeenCalled();
    expect(provider.canUpdate).not.toHaveBeenCalled();
  });

  it('속성이 동일하면 경우, 생성/수정 함수를 실행하지 않는다.', () => {
    const { rerender } = renderHook((props) => useInstance(props, provider), {
      initialProps,
    });

    rerender({ key: 'value' });

    // 생성 함수는 1번만 호출된다.
    expect(provider.create).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(provider.update).not.toHaveBeenCalled();

    // createPredicate 함수는 호출되지 않는다.
    expect(provider.canCreate).not.toHaveBeenCalled();
    expect(provider.canUpdate).not.toHaveBeenCalled();
  });

  it('true => 생성 함수만 실행', () => {
    const updatedProps = { key: 'newValue' };

    // true 반환 => 생성 함수 실행
    provider.canCreate.mockReturnValue(true);

    const { rerender } = renderHook((props) => useInstance(props, provider), {
      initialProps,
    });

    rerender(updatedProps);

    // 생성 함수는 2번 호출된다.
    expect(provider.create).toHaveBeenCalledTimes(2);
    expect(provider.create).toHaveBeenCalledWith(updatedProps, initialProps);

    // 수정 함수는 호출되지 않는다.
    expect(provider.update).not.toHaveBeenCalled();

    // createPredicate 함수는 1번만 호출된다.
    expect(provider.canCreate).toHaveBeenCalledTimes(1);

    // updatePredicate 함수는 호출되지 않는다.
    expect(provider.canUpdate).toHaveBeenCalledTimes(0);
  });

  it('false, true => 수정 함수 실행', () => {
    // true 반환 => 생성 함수 실행
    provider.canCreate.mockReturnValue(false);
    provider.canUpdate.mockReturnValue(true);

    const { rerender } = renderHook((props) => useInstance(props, provider), {
      initialProps,
    });

    rerender({ key: 'newValue' });

    // 생성 함수는 1번 호출된다.
    expect(provider.create).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(provider.update).toHaveBeenCalledTimes(1);

    // createPredicate 함수는 1번만 호출된다.
    expect(provider.canCreate).toHaveBeenCalledTimes(1);
    expect(provider.canUpdate).toHaveBeenCalledTimes(1);
  });

  it('false, false => 생성/수정 함수 실행을 하지 않는다', () => {
    provider.canCreate.mockReturnValue(false);
    provider.canUpdate.mockReturnValue(false);

    const { rerender } = renderHook((props) => useInstance(props, provider), {
      initialProps,
    });

    rerender({ key: 'newValue' });

    // 생성 함수는 1번 호출된다.
    expect(provider.create).toHaveBeenCalledTimes(1);

    // 수정 함수는 호출되지 않는다.
    expect(provider.update).toHaveBeenCalledTimes(0);

    // createPredicate 함수는 1번만 호출된다.
    expect(provider.canCreate).toHaveBeenCalledTimes(1);
    expect(provider.canUpdate).toHaveBeenCalledTimes(1);
  });
});
