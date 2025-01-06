export const BaseLayerCreateKeys = ['className'] as const;

export const BaseLayerUpdateKeys = [
  'minZoom',
  'maxZoom',
  'minResolution',
  'maxResolution',
  'zIndex',
  'opacity',
  'visible',
  'extent',
  'background',
] as const;

export const LayerCreateKeys = [...BaseLayerCreateKeys] as const;
export const LayerUpdateKeys = [...BaseLayerUpdateKeys, 'map', 'source'] as const;

// export const LayerKeys = [...BaseLayerKeys, 'source', 'map'] as const satisfies readonly (
//   | keyof LayerOptions
//   | 'map'
//   | 'background'
// )[];
//
// export const BaseTileLayerKeys = [...LayerKeys, 'preload'] as const satisfies readonly (keyof BaseTileOptions<any>)[];
//
// export const BaseImageLayerKeys = [...LayerKeys] as const satisfies readonly (
//   | keyof BaseImageOptions<any>
//   | 'background'
// )[];

export const BaseVectorLayerCreateKeys = [
  ...BaseLayerCreateKeys,
  'updateWhileAnimating',
  'updateWhileInteracting',
] as const;

export const BaseVectorLayerUpdateKeys = [
  ...BaseLayerUpdateKeys,
  'renderOrder',
  'source',
  'declutter',
  'style',
  'properties',
] as const;
