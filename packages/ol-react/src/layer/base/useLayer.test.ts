import { Options } from 'ol/layer/Layer';
import Map from 'ol/Map';
import { renderHook } from '@testing-library/react';
import { Layer } from 'ol/layer';
import { useLayer } from './useLayer';
import { useMapContext } from '../../context/MapContext';
import { Collection } from 'ol';
import { expect } from 'vitest';

// useBaseLayer 모킹
vi.mock('../../context/MapContext');
vi.mock('./useBaseLayer');

describe('useLayer', () => {
  let map: Map;
  let layer: Layer;
  let options: Options;

  beforeEach(() => {
    const layers = new Collection();

    map = {
      removeLayer: vi.fn(),
      getLayers: () => layers,
    } as unknown as Map;

    layer = {
      setMap: vi.fn(),
      getSource: vi.fn(),
    } as unknown as Layer;

    options = {
      map: null,
      className: 'test',
    };

    vi.mocked(useMapContext).mockReturnValue({ map });
  });

  it('레이어 추가/삭제', () => {
    const { unmount } = renderHook(() => useLayer(layer, options));

    expect(map.getLayers().getLength()).toBe(1);

    unmount();

    expect(map.getLayers().getLength()).toBe(0);
  });

  it('레이어 변경', () => {
    const prevLayer = { setMap: vi.fn(), getSource: vi.fn() } as unknown as Layer;
    const nextLayer = { setMap: vi.fn(), getSource: vi.fn(), className: 'nextLayer' } as unknown as Layer;

    const { rerender } = renderHook(() => useLayer(prevLayer, options));
    renderHook(() => useLayer(layer, options));
    renderHook(() => useLayer(layer, options));
    renderHook(() => useLayer(layer, options));

    // 레이어 4개 확인
    expect(map.getLayers().getLength()).toBe(4);

    const index = map.getLayers().getArray().indexOf(prevLayer);
    expect(index).toBe(0);

    console.log('====================================');
    rerender({
      ...options,
      layer: nextLayer,
    });
    console.log('====================================');
    //
    // const nextIndex = map.getLayers().getArray().indexOf(nextLayer);
    // expect(nextIndex).toBe(0);
    //
    // expect(map.getLayers().getLength()).toBe(4);
  });

  it('레이어의 map 속성에 값이 있을 경우, 레이어 목록에 추가하지 않는다', () => {
    const { unmount } = renderHook(() => useLayer(layer, { ...options, map }));

    expect(map.getLayers().getLength()).toBe(0);

    unmount();

    expect(map.getLayers().getLength()).toBe(0);

    // setMap(null) 호출
    expect(layer.setMap).toHaveBeenCalledWith(null);
  });
});
