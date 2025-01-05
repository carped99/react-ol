import { renderHook } from '@testing-library/react';
import { beforeEach, expect } from 'vitest';
import { useEvents, useMapContext, useView, ViewOptions } from '../../src';
import { useProperties } from '../../src/hooks/useProperties';

// ol 모듈을 모킹합니다.
vi.mock('ol', () => ({
  Map: vi.fn().mockImplementation(() => ({
    setView: vi.fn(),
    setTarget: vi.fn(),
    addLayer: vi.fn(),
    addControl: vi.fn(),
    addInteraction: vi.fn(),
    dispose: vi.fn(),
  })),
  View: vi.fn().mockImplementation(() => ({
    // View 관련 메서드들 모킹
  })),
}));

vi.mock('@src/context');

vi.mock('@src/hooks/useOlBaseObject', () => ({
  useOlBaseObject: vi.fn(),
}));

vi.mock('@src/observable', () => ({
  useOlObservable: vi.fn(),
}));

describe('useOlView', () => {
  let initialProps: ViewOptions;
  beforeEach(() => {
    vi.mocked(useMapContext).mockImplementation(() => ({
      setMap: vi.fn(),
      getMap: vi.fn(),
    }));

    initialProps = {
      center: [0, 0],
    };
  });

  it('should initialize view and call base object and observable hooks', () => {
    const { result } = renderHook(() => useView(initialProps));

    expect(result.current).toBeDefined();

    // Mock 호출 확인
    expect(useProperties).toHaveBeenCalled();
    expect(useEvents).toHaveBeenCalled();
  });

  it('should initialize view and call base object and observable hooks', () => {
    const { rerender } = renderHook((initialProps) => useView(initialProps), {
      initialProps,
    });

    rerender({ ...initialProps });
  });
});
