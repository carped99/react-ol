import BaseLayer, { Options } from 'ol/layer/Base';
import { useOlBaseLayer } from './useOlBaseLayer';
import { renderHook } from '@testing-library/react';

describe('useBaseLayer', () => {
  let layer: BaseLayer;
  let options: Options;

  beforeEach(() => {
    layer = {
      setMinZoom: vi.fn(),
      setMaxZoom: vi.fn(),
      setMinResolution: vi.fn(),
      setMaxResolution: vi.fn(),
      setZIndex: vi.fn(),
      setOpacity: vi.fn(),
      setVisible: vi.fn(),
      setExtent: vi.fn(),
      setProperties: vi.fn(),
      getMinZoom: vi.fn(),
      getMaxZoom: vi.fn(),
      getMinResolution: vi.fn(),
      getMaxResolution: vi.fn(),
      getZIndex: vi.fn(),
      getOpacity: vi.fn(),
      getVisible: vi.fn(),
      getExtent: vi.fn(),
      getBackground: vi.fn(),
    } as unknown as BaseLayer;

    options = {
      minZoom: 0,
      maxZoom: 20,
      minResolution: 1,
      maxResolution: 1000,
      zIndex: 1,
      opacity: 0.5,
      visible: true,
      extent: [0, 0, 100, 100],
      properties: { test: 'property' },
    };
  });

  it('레이어가 nullish일 경우 오류', () => {
    expect(() => {
      renderHook(() => useOlBaseLayer(undefined as unknown as BaseLayer, options));
    }).toThrowError('layer is required');
  });

  it('[minZoom] 값이 변경될 경우 setMinZoom 호출', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, minZoom: 2 }));
    expect(layer.setMinZoom).toHaveBeenCalledWith(2);
  });

  it('[minZoom] 값이 동일하면 무시', () => {
    vi.mocked(layer.getMinZoom).mockReturnValue(1);
    renderHook(() => useOlBaseLayer(layer, { ...options, minZoom: 1 }));
    expect(layer.setMinZoom).not.toHaveBeenCalled();
  });

  it('[minZoom] 값이 nullish 일 경우 무시', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, minZoom: undefined }));
    expect(layer.setMinZoom).not.toHaveBeenCalled();
  });

  it('[maxZoom] 값이 변경될 경우 setMaxZoom 호출', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, maxZoom: 20 }));
    expect(layer.setMaxZoom).toHaveBeenCalledWith(20);
  });

  it('[maxZoom] 값이 동일하면 무시', () => {
    vi.mocked(layer.getMaxZoom).mockReturnValue(1);
    renderHook(() => useOlBaseLayer(layer, { ...options, maxZoom: 1 }));
    expect(layer.setMaxZoom).not.toHaveBeenCalled();
  });

  it('[maxZoom] 값이 nullish 일 경우 무시', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, maxZoom: undefined }));
    expect(layer.setMaxZoom).not.toHaveBeenCalled();
  });

  it('[minResolution] 값이 변경될 경우 setMinResolution 호출', () => {
    vi.mocked(layer.getMinResolution).mockReturnValue(2);
    renderHook(() => useOlBaseLayer(layer, { ...options, minResolution: 1 }));
    expect(layer.setMinResolution).toHaveBeenCalledWith(1);
  });

  it('[minResolution] 값이 동일하면 무시', () => {
    vi.mocked(layer.getMinResolution).mockReturnValue(1);
    renderHook(() => useOlBaseLayer(layer, { ...options, minResolution: 1 }));
    expect(layer.setMinResolution).not.toHaveBeenCalled();
  });

  it('[minResolution] 값이 nullish 일 경우 무시', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, minResolution: undefined }));
    expect(layer.setMinResolution).not.toHaveBeenCalled();
  });

  it('[maxResolution] 값이 변경될 경우 setMaxResolution 호출', () => {
    vi.mocked(layer.getMaxResolution).mockReturnValue(999);
    renderHook(() => useOlBaseLayer(layer, { ...options, maxResolution: 1000 }));
    expect(layer.setMaxResolution).toHaveBeenCalledWith(1000);
  });

  it('[maxResolution] 값이 동일하면 무시', () => {
    vi.mocked(layer.getMaxResolution).mockReturnValue(1);
    renderHook(() => useOlBaseLayer(layer, { ...options, maxResolution: 1 }));
    expect(layer.setMaxResolution).not.toHaveBeenCalled();
  });

  it('[maxResolution] 값이 nullish 일 경우 무시', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, maxResolution: undefined }));
    expect(layer.setMaxResolution).not.toHaveBeenCalled();
  });

  it('[zIndex] 값이 변경될 경우 setZIndex 호출', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, zIndex: 1 }));
    expect(layer.setZIndex).toHaveBeenCalledWith(1);
  });

  it('[zIndex] 값이 동일하면 무시', () => {
    vi.mocked(layer.getZIndex).mockReturnValue(1);
    renderHook(() => useOlBaseLayer(layer, { ...options, zIndex: 1 }));
    expect(layer.setZIndex).not.toHaveBeenCalled();
  });

  it('[zIndex] 값이 nullish 일 경우 무시', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, zIndex: undefined }));
    expect(layer.setZIndex).not.toHaveBeenCalled();
  });

  it('[opacity] 값이 변경될 경우 setOpacity 호출', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, opacity: 0.5 }));
    expect(layer.setOpacity).toHaveBeenCalledWith(0.5);
  });

  it('[opacity] 값이 동일하면 무시', () => {
    vi.mocked(layer.getOpacity).mockReturnValue(1);
    renderHook(() => useOlBaseLayer(layer, { ...options, opacity: 1 }));
    expect(layer.setOpacity).not.toHaveBeenCalled();
  });

  it('[opacity] 값이 nullish 일 경우 무시', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, opacity: undefined }));
    expect(layer.setOpacity).not.toHaveBeenCalled();
  });

  it('[visible] 값이 변경될 경우 setVisible 호출', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, visible: true }));
    expect(layer.setVisible).toHaveBeenCalledWith(true);
  });

  it('[visible] 값이 동일하면 무시', () => {
    vi.mocked(layer.getVisible).mockReturnValue(true);
    renderHook(() => useOlBaseLayer(layer, { ...options, visible: true }));
    expect(layer.setVisible).not.toHaveBeenCalled();
  });

  it('[visible] 값이 nullish 일 경우 무시', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, visible: undefined }));
    expect(layer.setVisible).not.toHaveBeenCalled();
  });

  it('[extent] 값이 변경될 경우 setExtent 호출', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, extent: [0, 0, 100, 100] }));
    expect(layer.setExtent).toHaveBeenCalledWith([0, 0, 100, 100]);
  });

  it('[extent] 값이 동일하면 무시', () => {
    vi.mocked(layer.getExtent).mockReturnValue([0, 0, 100, 100]);
    renderHook(() => useOlBaseLayer(layer, { ...options, extent: [0, 0, 100, 100] }));
    expect(layer.setExtent).not.toHaveBeenCalled();
  });

  it('sets properties when provided', () => {
    renderHook(() => useOlBaseLayer(layer, { ...options, properties: { test: 'property' } }));
    expect(layer.setProperties).toHaveBeenCalledWith({ test: 'property' });
  });
});
