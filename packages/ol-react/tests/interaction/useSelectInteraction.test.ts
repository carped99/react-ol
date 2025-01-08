import { renderHook } from '@testing-library/react';
import { useSelectInteraction } from '../../src';
import { beforeEach, expect } from 'vitest';
import { Select } from 'ol/interaction';
import { Options } from 'ol/interaction/Select';

vi.mock('ol/interaction');
vi.mock('ol/interaction/Select');

describe('useSelectInteraction', () => {
  let options: Options;

  beforeEach(() => {
    options = {
      hitTolerance: 10,
      multi: false,
    };
  });

  it('기본 생성', () => {
    const { result } = renderHook(() => useSelectInteraction());

    expect(Select).toHaveBeenCalledWith(undefined);

    expect(Select).toHaveBeenCalledTimes(1);

    expect(result.current).toBeInstanceOf(Select);
  });

  it('동일한 인자일 경우 재생성하지 않는다.', () => {
    const { result, rerender } = renderHook((props) => useSelectInteraction(props), {
      initialProps: options,
    });

    expect(result.current).toBeInstanceOf(Select);

    rerender(options);
    rerender({ ...options });

    expect(Select).toHaveBeenCalledTimes(1);
  });

  it('재생성 항목이 변경되면 재생성한다.', () => {
    const { rerender } = renderHook((props) => useSelectInteraction(props), {
      initialProps: options,
    });

    rerender({ ...options, multi: true });
    expect(Select).toHaveBeenCalledTimes(2);

    rerender({ ...options, multi: true, layers: [] });
    rerender({ ...options, multi: true, layers: [] });
    expect(Select).toHaveBeenCalledTimes(3);
  });

  it('should', () => {
    const { rerender } = renderHook((initialProps) => useSelectInteraction(initialProps), {
      initialProps: options,
    });

    rerender({
      hitTolerance: 10,
    });

    expect(Select).toHaveBeenCalledTimes(1);
  });

  // it('should create a Select interaction with provided options', () => {
  //   const options = { condition: () => true };
  //   const { result } = renderHook(() => useSelectInteraction(options));
  //
  //   expect(result.current).toBeInstanceOf(Select);
  //   expect(result.current.getCondition()).toBe(options.condition);
  // });
  //
  // it('should activate and deactivate the interaction based on the active parameter', () => {
  //   const { result, rerender } = renderHook(({ active }) => useSelectInteraction({}, active), {
  //     initialProps: { active: true },
  //   });
  //
  //   expect(result.current.getActive()).toBe(true);
  //
  //   rerender({ active: false });
  //   expect(result.current.getActive()).toBe(false);
  // });
});
