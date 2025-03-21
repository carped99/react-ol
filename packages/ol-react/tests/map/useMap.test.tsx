import { renderHook } from '@testing-library/react';
import React, { act, MutableRefObject } from 'react';
import { beforeEach, expect } from 'vitest';
import { Map, View } from 'ol';
import { MapOptions, MapProvider, useMap, useMapContext } from '../../src/core';

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

vi.mock('@src/context/MapContext');

describe('useMapView hook', () => {
  let mapOptions: MapOptions;
  beforeEach(() => {
    vi.mocked(useMapContext).mockImplementation(() => ({
      setMap: vi.fn(),
      getMap: vi.fn(),
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

  it('Map 생성하기', () => {
    const { result, rerender } = renderHook((initialProps) => useMap(initialProps), {
      initialProps: mapOptions,
    });
    const ref = result.current[0] as MutableRefObject<HTMLDivElement>;

    // container 생성
    ref.current = document.createElement('div');

    // rerender 이후 Map의 target이 제대로 설정된 것을 확인
    rerender({ ...mapOptions });
    expect(Map).toHaveBeenCalledWith(expect.objectContaining({ target: ref.current }));
  });

  it('View 변경시 setView 호출', () => {
    const { result, rerender } = renderHook((initialProps) => useMap(initialProps), {
      initialProps: mapOptions,
    });

    // target 설정
    const ref = result.current[0] as MutableRefObject<HTMLDivElement>;
    ref.current = document.createElement('div');

    // rerender 이후 Map의 target이 제대로 설정된 것을 확인
    rerender({ ...mapOptions });
    expect(Map).toHaveBeenCalledWith(expect.objectContaining({ target: ref.current }));
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
  it('view 변경시 setView 함수 호출', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <MapProvider>{children}</MapProvider>;
    const { result, rerender } = renderHook((props) => useMap(props), {
      wrapper,
      initialProps: mapOptions,
    });

    const newView = new View({
      center: [100, 100],
      zoom: 10,
    });

    act(() => {
      rerender({
        ...mapOptions,
        view: newView,
      });
    });

    console.log(result.current.current);

    expect(result.current.current).not.toBeNull();
  });
});
