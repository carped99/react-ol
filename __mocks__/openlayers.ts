class MockMap {
  constructor(options: any) {
    this.options = options;
    console.log('Map constructor', options);
  }

  options: any;
  setTarget = vi.fn();
  getTarget = vi.fn();
  setView = vi.fn();
  addLayer = vi.fn();
  addControl = vi.fn();
  addInteraction = vi.fn();
  dispose = vi.fn();
}

export const Map = MockMap;
export const View = vi.fn();
export const Layer = vi.fn();
