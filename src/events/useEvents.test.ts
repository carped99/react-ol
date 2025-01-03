import { expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import BaseObject from 'ol/Object';
import { useEvents } from './useEvents';
import { unByKey } from 'ol/Observable';

// 모듈을 모킹
vi.mock('ol/Observable', () => ({
  unByKey: vi.fn(),
}));

// OpenLayers에서 사용할 실제 객체를 사용
describe('useObservable', () => {
  let baseObject: BaseObject;

  beforeEach(() => {
    baseObject = new BaseObject();
  });

  afterEach(() => {
    baseObject.dispose();
  });

  it('이벤트 함수를 등록하고, 언마운트시 해제', () => {
    const onSpy = vi.spyOn(baseObject, 'on');

    const initialProps = {
      target: baseObject,
      props: { onClick: vi.fn() },
    };

    const { unmount } = renderHook(({ target, props }) => useEvents(target, props), {
      initialProps,
    });

    // 핸들러가 호출되었는지 확인
    expect(onSpy).toHaveBeenCalledTimes(1);

    // 언마운트 후 핸들러가 제거되었는지 확인
    unmount();

    expect(unByKey).toBeCalled();
  });

  it('이벤트 함수가 동일하면 새로 등록하지 않는다', () => {
    const onSpy = vi.spyOn(baseObject, 'on');

    const handler = vi.fn();

    const initialProps = {
      target: baseObject,
      props: { onClick: handler },
    };

    const { rerender } = renderHook(({ target, props }) => useEvents(target, props), {
      initialProps,
    });

    // 이벤트를 등록하는 함수 호출 여부 확인
    expect(onSpy).toHaveBeenCalledWith('click', handler);

    // 동일한 이벤트 함수를 사용해도 다시 등록하지 않는다
    rerender({
      ...initialProps,
      props: { onClick: handler },
    });

    // 이벤트를 등록하는 함수의 호출 횟수는 1
    expect(onSpy).toHaveBeenCalledTimes(1);
  });

  it('이벤트 함수를 제거', () => {
    const initialProps = {
      target: baseObject,
      props: { onClick: vi.fn() },
    };

    const { rerender } = renderHook(({ target, props }) => useEvents(target, props), {
      initialProps,
    });

    rerender({
      ...initialProps,
      props: undefined as any,
    });

    expect(unByKey).toBeCalled();
  });

  it('이벤트 함수 변경가 변경되면 새로 등록한다', () => {
    const prevHandler = vi.fn();
    const nextHandler = vi.fn();
    const onSpy = vi.spyOn(baseObject, 'on');

    const initialProps = {
      target: baseObject,
      props: { onClick: prevHandler },
    };

    const { rerender } = renderHook(({ target, props }) => useEvents(target, props), {
      initialProps,
    });

    // 이벤트를 등록하는 함수 호출 여부 확인
    expect(onSpy).toHaveBeenCalledWith('click', prevHandler);

    rerender({
      target: baseObject,
      props: { onClick: nextHandler },
    });

    // 이벤트를 등록하는 함수 호출 여부 확인
    expect(onSpy).toHaveBeenCalledWith('click', nextHandler);

    // 이전 이벤트 함수 제거 여부 확인
    expect(unByKey).toBeCalled();
  });

  it('`on`으로 시작하지 않는 이벤트 타입', () => {
    const prevHandler = vi.fn();
    const onSpy = vi.spyOn(baseObject, 'on');

    const initialProps = {
      target: baseObject,
      props: { test: prevHandler },
    };

    const { unmount } = renderHook(({ target, props }) => useEvents(target, props), {
      initialProps,
    });

    // 이벤트를 등록하는 함수 호출 여부 확인
    expect(onSpy).toHaveBeenCalledWith('test', prevHandler);

    unmount();

    // 이벤트 함수 제거 여부 확인
    expect(unByKey).toBeCalled();
  });
});
