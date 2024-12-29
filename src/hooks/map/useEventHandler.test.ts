import { useEventHandler } from './useEventHandler'; // 실제 경로에 맞게 수정하세요.
import { expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import BaseObject from 'ol/Object';

// OpenLayers에서 사용할 실제 객체를 사용
describe('useEventHandler hook with OpenLayers', () => {
  let baseObject: BaseObject;

  beforeEach(() => {
    baseObject = new BaseObject();
  });

  afterEach(() => {
    baseObject.dispose();
  });

  it('이벤트 함수 등록/해제', () => {
    const clickHandler = vi.fn();
    const props = { onClick: clickHandler };

    const { unmount } = renderHook(({ target, props }) => useEventHandler(target, props), {
      initialProps: { target: baseObject, props },
    });

    baseObject.dispatchEvent('click');

    // 핸들러가 호출되었는지 확인
    expect(clickHandler).toHaveBeenCalledTimes(1);

    // 언마운트 후 핸들러가 제거되었는지 확인
    unmount();

    baseObject.dispatchEvent('click');

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
  //
  // it('should register and clean up event handlers on BaseObject', () => {
  //   const clickHandler = vi.fn();
  //   const testHandler = vi.fn();
  //   const props = { onClick: clickHandler, onTest: testHandler };
  //
  //   // `useEventHandler` 훅을 렌더링하여 BaseObject에 이벤트 핸들러를 등록
  //   const { rerender, unmount } = renderHook(({ target, props }) => useEventHandler(target, props), {
  //     initialProps: { target: baseObject, props },
  //   });
  //
  //   // BaseObject에서 이벤트 트리거
  //   act(() => {
  //     baseObject.dispatchEvent('click'); // BaseObject에서 click 이벤트 트리거
  //   });
  //
  //   // 핸들러가 호출되었는지 확인
  //   expect(clickHandler).toHaveBeenCalledTimes(1);
  //   expect(testHandler).toHaveBeenCalledTimes(0);
  //
  //   // props 변경 후 핸들러가 업데이트 되었는지 확인
  //   const newMockHandler = vi.fn();
  //   rerender({
  //     target: baseObject,
  //     props: { onClick: newMockHandler },
  //   });
  //
  //   act(() => {
  //     baseObject.dispatchEvent({ type: 'click' });
  //   });
  //
  //   expect(clickHandler).toHaveBeenCalledTimes(1); // 이전 핸들러는 호출되지 않아야 함
  //   expect(newMockHandler).toHaveBeenCalledTimes(1); // 새로운 핸들러는 호출되어야 함
  //
  //   // 언마운트 후 핸들러가 제거되었는지 확인
  //   unmount();
  //
  //   act(() => {
  //     baseObject.dispatchEvent({ type: 'click' });
  //   });
  //
  //   expect(newMockHandler).toHaveBeenCalledTimes(1); // 언마운트 후에도 호출되지 않음
  // });
  //
  it('이벤트 함수 변경가 변경되면 이전 함수는 호출되지 않는다', () => {
    const prevHandler = vi.fn();
    const nextHandler = vi.fn();

    const { rerender, unmount } = renderHook(({ target, props }) => useEventHandler(target, props), {
      initialProps: {
        target: baseObject,
        props: { onClick: prevHandler },
      },
    });

    baseObject.dispatchEvent('click');
    expect(prevHandler).toHaveBeenCalledTimes(1);
    expect(nextHandler).toHaveBeenCalledTimes(0);

    rerender({
      target: baseObject,
      props: { onClick: nextHandler },
    });

    baseObject.dispatchEvent('click');

    expect(prevHandler).toHaveBeenCalledTimes(1);
    expect(nextHandler).toHaveBeenCalledTimes(1);

    unmount();
  });
});
