import { renderHook } from '@testing-library/react';
import React from 'react';
import { beforeEach, expect } from 'vitest';
import { Map, View } from 'ol';
import { useMapDispatch } from '@src/context/MapContext';
import { MapOptions, useMap } from '@src/map/useMap';

vi.mock('ol', () => ({
  Map: vi.fn(() => ({
    setTarget: vi.fn(),
    dispose: vi.fn(),
    setView: vi.fn(),
  })),
  View: vi.fn(),
}));

vi.mock('../../context/MapContext');

describe('useMapView hook', () => {
  let mapOptions: MapOptions;
  beforeEach(() => {
    vi.mocked(useMapDispatch).mockImplementation(() => ({
      setMap: vi.fn(),
    }));

    mapOptions = {
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
      layers: [],
      controls: [],
      interactions: [],
    };
  });

  it('mapRef.current 값이 없을 경우 생성하지 않는다', () => {
    const useRefMock = vi.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });

    renderHook(() => useMap(mapOptions));

    expect(Map).not.toHaveBeenCalled();

    useRefMock.mockRestore();
  });

  it('should create a map when mapRef.current exists', () => {
    const mockDivElement = document.createElement('div');
    vi.spyOn(React, 'useRef').mockReturnValueOnce({ current: mockDivElement });

    renderHook(() => useMap(mapOptions));

    // result.current(mockDivElement);

    expect(Map).toHaveBeenCalledWith(expect.objectContaining({ target: mockDivElement }));

    // result.current(null);
  });

  // it('should create a map instance', async () => {
  //   const mockDivElement = document.createElement('div');
  //   vi.spyOn(React, 'useRef').mockReturnValueOnce({ current: mockDivElement });
  //
  //   const { result } = renderHook(() => useMap(mapOptions));
  //
  //   render(<TestComponent mapRef={result.current} />);
  //
  //   await waitFor(
  //     () => {
  //       expect(result.current.current).toBe(mockDivElement);
  //     },
  //     { timeout: 5000 },
  //   );
  //   expect(result.current.current).toBe(mockDivElement);
  // });
  //
  // it('renders without crashing', async () => {
  //   const container = document.createElement('div');
  //   const { result, rerender, unmount } = renderHook(() => useMap(mapOptions));
  //
  //   // 반환값을 확인
  //   expect(result.current).toBeDefined();
  //   expect(result.current.current).toBeNull(); // 초기에는 null
  //
  //   // ref를 사용하여 실제 DOM에 연결
  //   act(() => {
  //     render(<TestComponent mapRef={result.current} />, { container });
  //   });
  //
  //   // ref가 DOM 요소에 연결되었는지 확인
  //   expect(result.current.current).toBeInstanceOf(HTMLDivElement);
  //
  //   rerender({
  //     view: {
  //       center: [0, 0],
  //       zoom: 0,
  //     },
  //     onDblClick: () => {
  //       console.log('dblclick');
  //     },
  //   });
  //
  //   await waitFor(() => {
  //     expect(result.current.current).not.toBeNull();
  //   });
  //
  //   unmount();
  // });
  //
  // it('view 변경시 setView 함수 호출', async () => {
  //   const wrapper = ({ children }: { children: React.ReactNode }) => <MapProvider>{children}</MapProvider>;
  //   const { result, rerender } = renderHook((props) => useMap(props), {
  //     wrapper,
  //     initialProps: mapOptions,
  //   });
  //
  //   const newView = new View({
  //     center: [100, 100],
  //     zoom: 10,
  //   });
  //
  //   act(() => {
  //     rerender({
  //       ...mapOptions,
  //       view: newView,
  //     });
  //   });
  //
  //   console.log(result.current.current);
  //
  //   expect(result.current.current).not.toBeNull();
  // });
});
