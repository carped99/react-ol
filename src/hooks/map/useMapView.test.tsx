import { act, render, renderHook, waitFor } from '@testing-library/react';
import { MapViewOptions, useMapView } from '@src/hooks/map/useMapView';
import { RefObject } from 'react';

const TestComponent = ({ mapRef }: { mapRef: RefObject<HTMLDivElement | null> }) => (
  <div ref={mapRef} style={{ width: 100, height: 100 }} />
);

describe('useMapView hook', () => {
  it('renders without crashing', async () => {
    const container = document.createElement('div');
    const { result, rerender, unmount } = renderHook((initialProps) => useMapView(initialProps), {
      initialProps: {
        view: {
          center: [0, 0],
          zoom: 0,
        },
        onDblClick: () => {
          console.log('dblclick');
        },
      } as MapViewOptions,
    });

    // 반환값을 확인
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull(); // 초기에는 null

    // ref를 사용하여 실제 DOM에 연결
    act(() => {
      render(<TestComponent mapRef={result.current} />, { container });
    });

    // ref가 DOM 요소에 연결되었는지 확인
    expect(result.current.current).toBeInstanceOf(HTMLDivElement);

    rerender({
      view: {
        center: [0, 0],
        zoom: 0,
      },
      onDblClick: () => {
        console.log('dblclick');
      },
    });

    await waitFor(() => {
      expect(result.current.current).not.toBeNull();
    });

    unmount();
  });
});
